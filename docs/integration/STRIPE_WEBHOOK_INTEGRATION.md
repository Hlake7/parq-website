# Parq Stripe Webhook Implementation - Complete Technical Documentation

**Document Version:** 1.0
**Last Updated:** 2025-10-07
**Project:** Parq Parking Detection System
**Component:** Stripe Payment Webhook Integration

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture Overview](#system-architecture-overview)
3. [Current Stripe Webhook Implementation](#current-stripe-webhook-implementation)
4. [Webhook Events & Processing](#webhook-events--processing)
5. [Payment Flow Architecture](#payment-flow-architecture)
6. [Configuration & Credentials](#configuration--credentials)
7. [Integration Points](#integration-points)
8. [Code Reference Guide](#code-reference-guide)
9. [Testing & Debugging](#testing--debugging)
10. [Custom Checkout Page Requirements](#custom-checkout-page-requirements)
11. [Common Issues & Solutions](#common-issues--solutions)

---

## Executive Summary

The Parq parking detection system uses Stripe webhooks to process parking payments and automatically extend parking validation periods. When a customer completes payment through Stripe Checkout, the webhook handler processes the payment, stores it in Azure Table Storage, and triggers SMS confirmation notifications.

**Key Components:**
- **Stripe Webhook Handler:** Azure Function that processes Stripe checkout.session.completed events
- **Payment Storage:** parkingfeedback table in Azure Table Storage
- **SMS Notifications:** Twilio integration for payment confirmations
- **Validation System:** Continuous validation functions that check payment status

**Critical Business Logic:**
- Payment creates immediate parking validation (no grace period)
- 5-minute payment deadline after car detection
- Automatic SMS confirmation for customers who opt-in
- Payment data feeds into computer vision validation system

---

## System Architecture Overview

```
┌─────────────────┐
│ Stripe Checkout │ (Customer completes payment)
└────────┬────────┘
         │ webhook event: checkout.session.completed
         ▼
┌─────────────────────────────────────────┐
│ Azure Function: stripeWebhook           │
│ Path: stripeWebhookPP-update/           │
│ Endpoint: /api/stripeWebhook            │
└────────┬────────────────────────────────┘
         │
         ├──► 1. Verify webhook signature
         ├──► 2. Extract payment data
         ├──► 3. Calculate expiration time
         ├──► 4. Store in parkingfeedback table
         └──► 5. Send SMS confirmation (if opted-in)
                │
                ▼
         ┌──────────────────────┐
         │ Azure Table Storage  │
         │ Table: parkingfeedback │
         └──────────┬───────────┘
                    │
         ┌──────────▼───────────────────┐
         │ Continuous Validation System │
         │ (5-minute timer trigger)     │
         └──────────┬───────────────────┘
                    │
                    ├──► Check payment expiration
                    ├──► Send 15-minute warnings
                    ├──► Send expiration notices
                    └──► Generate violation records
```

---

## Current Stripe Webhook Implementation

### Azure Function Details

**Function App Name:** stripeWebhookPP-update
**Function Name:** stripeWebhook
**HTTP Route:** `/api/stripeWebhook`
**Auth Level:** ANONYMOUS (protected by Stripe signature verification)
**Runtime:** Python 3.9+
**Deployment:** Azure Functions v2

**File Structure:**
```
stripeWebhookPP-update/
├── function_app.py          # Main webhook handler (298 lines)
├── requirements.txt         # Python dependencies
├── host.json               # Azure Functions configuration
└── local.settings.json     # Local environment variables
```

### Primary Function: `stripe_webhook_handler()`

**Location:** `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\stripeWebhookPP-update\function_app.py` (Lines 92-136)

**Purpose:** Main webhook endpoint that receives and processes Stripe events

**Key Features:**
- Signature verification using Stripe webhook secret
- Event type filtering (currently only handles checkout.session.completed)
- Error handling with detailed logging
- Returns appropriate HTTP status codes

**Code Reference:**
```python
@app.function_name(name="stripeWebhook")
@app.route(route="stripeWebhook", auth_level=func.AuthLevel.ANONYMOUS)
def stripe_webhook_handler(req: func.HttpRequest) -> func.HttpResponse:
    """
    Handle Stripe webhook events for parking payments
    """
    logging.info("Stripe webhook received")

    try:
        # Get the webhook secret from environment
        webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
        if not webhook_secret:
            logging.error("STRIPE_WEBHOOK_SECRET not configured")
            return func.HttpResponse("Webhook secret not configured", status_code=500)

        # Get the request body
        payload = req.get_body()
        sig_header = req.headers.get('stripe-signature')

        if not sig_header:
            logging.error("No Stripe signature header")
            return func.HttpResponse("No signature header", status_code=400)

        try:
            # Verify the webhook signature
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError as e:
            logging.error(f"Invalid payload: {e}")
            return func.HttpResponse("Invalid payload", status_code=400)
        except stripe.error.SignatureVerificationError as e:
            logging.error(f"Invalid signature: {e}")
            return func.HttpResponse("Invalid signature", status_code=400)

        # Handle the event
        if event['type'] == 'checkout.session.completed':
            return handle_checkout_session_completed(event)
        else:
            logging.info(f"Unhandled event type: {event['type']}")
            return func.HttpResponse("Event type not handled", status_code=200)

    except Exception as e:
        logging.error(f"Webhook error: {str(e)}")
        return func.HttpResponse(f"Webhook error: {str(e)}", status_code=500)
```

---

## Webhook Events & Processing

### Currently Handled Events

#### 1. `checkout.session.completed`

**Trigger:** Customer successfully completes Stripe Checkout payment
**Handler Function:** `handle_checkout_session_completed()` (Lines 138-258)
**Processing Time:** Typically 200-500ms

**Event Processing Steps:**

1. **Extract Custom Fields from Session**
   - `spacenumber`: Parking space number (numeric field)
   - `licenseplatenumber`: Vehicle license plate (text field)
   - `wouldyouliketoreceivetextreminders`: SMS opt-in preference (dropdown)

2. **Calculate Payment Duration**
   - $2.50+ = 1 hour parking
   - $1.25-$2.49 = 30 minutes parking
   - Default: 1 hour

3. **Determine Time Zones**
   - Event creation time → Mountain Time (America/Denver)
   - Calculate expiration time based on duration
   - Store all times in ISO format with timezone

4. **Extract Customer Data**
   - Email from `session.customer_details.email`
   - Phone number from `session.customer_details.phone`
   - Phone normalization to +1XXXXXXXXXX format

5. **Store Payment Record**
   - Write to `parkingfeedback` Azure Table
   - PartitionKey: "Transaction"
   - RowKey: `payment_{event_id}_{space_number}`

6. **Send SMS Confirmation** (if opted-in)
   - Call `send_payment_confirmation_sms()`
   - Include space number and expiration time
   - Log success/failure

**Event Payload Structure:**

```json
{
  "id": "evt_xxx",
  "type": "checkout.session.completed",
  "created": 1699999999,
  "data": {
    "object": {
      "id": "cs_xxx",
      "amount_total": 250,
      "currency": "usd",
      "customer_details": {
        "email": "customer@example.com",
        "phone": "(480) 729-3879"
      },
      "custom_fields": [
        {
          "key": "spacenumber",
          "numeric": {
            "value": 15
          }
        },
        {
          "key": "licenseplatenumber",
          "text": {
            "value": "ABC123"
          }
        },
        {
          "key": "wouldyouliketoreceivetextreminders",
          "dropdown": {
            "value": "yes"
          }
        }
      ],
      "expires_at": 1699999999,
      "payment_status": "paid",
      "status": "complete"
    }
  }
}
```

**Payment Record Schema:**

Stored in Azure Table Storage `parkingfeedback` table:

```python
{
    "PartitionKey": "Transaction",
    "RowKey": "payment_{event_id}_{space_number}",
    "SpaceNumber": "15",
    "LicensePlate": "ABC123",
    "TimePaid": "2024-11-15T14:30:00-07:00",  # Mountain Time
    "Quantity": 1.0,  # Hours
    "Amount": 2.50,  # Dollars
    "TimeExpires": "2024-11-15T15:30:00-07:00",  # Mountain Time
    "Email": "customer@example.com",
    "PhoneNumber": "+14807293879",  # Normalized format
    "TextReminders": "yes"
}
```

### Unhandled Events (Currently Ignored)

These Stripe events are NOT currently processed but may be useful for custom checkout:

- `payment_intent.succeeded` - Direct payment confirmation
- `payment_intent.payment_failed` - Failed payment handling
- `charge.succeeded` - Alternative payment confirmation
- `charge.refunded` - Refund processing
- `checkout.session.expired` - Abandoned checkout tracking

---

## Payment Flow Architecture

### Complete End-to-End Flow

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Car Detection                                       │
│ ─────────────────────────────────────────────────────────── │
│ Computer vision detects car in parking space                │
│ Updates Occupancy table: IsOccupied = True                  │
│ Records LastUpdateTime for violation calculation            │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Customer Payment                                    │
│ ─────────────────────────────────────────────────────────── │
│ Customer opens Stripe Checkout page                         │
│ Enters: Space #, License Plate, SMS preference             │
│ Completes payment ($2.50 for 1 hour)                       │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Webhook Processing (THIS IMPLEMENTATION)           │
│ ─────────────────────────────────────────────────────────── │
│ Stripe sends checkout.session.completed webhook             │
│ Webhook verifies signature                                  │
│ Extracts payment data (space, plate, duration)             │
│ Calculates expiration time (TimePaid + Duration)           │
│ Stores in parkingfeedback table                            │
│ Sends SMS confirmation to customer                          │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Continuous Validation (Every 5 minutes)            │
│ ─────────────────────────────────────────────────────────── │
│ Query Occupancy table for occupied spots                    │
│ For each occupied spot:                                     │
│   - Query parkingfeedback for payment                      │
│   - Calculate time delta (detection vs payment)            │
│   - Check if payment expired                                │
│   - Send 15-min warning if expiring soon                   │
│   - Send expiration notice if expired                       │
│   - Generate violation if payment too late (>5 min)        │
└─────────────────────────────────────────────────────────────┘
```

### Time Delta Calculation Logic

**Critical for Violation Detection:**

The validation system calculates multiple time deltas to determine violation status:

1. **Detection vs Payment Completion** (NEW - uses webhook data)
   - `detection_time` - `payment_completed_at`
   - If > 5 minutes: VIOLATION (payment too late)
   - If 0-5 minutes: WARNING (slight delay)
   - If negative: PAID (payment before detection)

2. **Detection vs Payment Expiration** (LEGACY)
   - `detection_time` - `payment_expires`
   - Positive: Car detected after payment expired
   - Negative: Payment still valid

3. **Current Time vs Payment Expiration**
   - `validation_time` - `payment_expires`
   - Positive: Payment expired (current violation)
   - -15 to 0 minutes: Send 15-minute warning
   - 0 to 10 minutes: Send expiration notice

**Code Reference:** `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\validation-functions-app\continuous_validation\__init__.py` (Lines 55-200)

### Database Operations Triggered by Webhooks

**1. INSERT into parkingfeedback table**

```python
# Location: function_app.py, Lines 195-224
service = TableServiceClient.from_connection_string(connection_string)
table_client = service.get_table_client("parkingfeedback")

payment_record = {
    "PartitionKey": "Transaction",
    "RowKey": f"payment_{event['id']}_{space_number}",
    "SpaceNumber": space_number,
    "LicensePlate": license_plate,
    "TimePaid": time_paid.isoformat(),
    "Quantity": duration_hours,
    "Amount": session['amount_total'] / 100,
    "TimeExpires": time_expires.isoformat(),
    "Email": session.get('customer_details', {}).get('email'),
    "PhoneNumber": normalized_phone,
    "TextReminders": text_reminders
}

table_client.create_entity(entity=payment_record)
```

**2. QUERY from Occupancy table** (by validation functions)

```python
# Location: continuous_validation/__init__.py, Lines 38-52
occupancy_table_client = get_validation_table_client("Occupancy")

occupied_spots = occupancy_table_client.query_entities(
    query_filter="PartitionKey eq 'LOT_IMAGES' and IsOccupied eq true"
)
```

**3. QUERY from parkingfeedback table** (by validation functions)

```python
# Location: continuous_validation/__init__.py, Lines 299-314
parkingfeedback_table_client = get_validation_table_client("parkingfeedback")

# Query both schema formats for compatibility
payments_current = list(parkingfeedback_table_client.query_entities(
    query_filter=f"SpaceNumber eq '{space_number}'"
))

payments_main_branch = list(parkingfeedback_table_client.query_entities(
    query_filter=f"PartitionKey eq 'Transaction' and SpaceNumber eq '{space_number}'"
))
```

**4. INSERT into validationoutput table** (by validation functions)

```python
# Location: continuous_validation/__init__.py, Lines 408-472
validation_table_client = get_validation_table_client("validationoutput")

validation_record = {
    "PartitionKey": "AutoValidation",
    "RowKey": f"{space_number}_{uuid.uuid4()}",
    "SpaceNumber": space_number,
    "IsOccupied": True,
    "IsPaid": payment_data["is_paid"],
    "ViolationStatus": violation_status,
    "ViolationType": time_delta_data["violation_type"],
    "TimeDeltaMinutes": round(time_delta_data["time_delta_minutes"], 1),
    "Message": message,
    "ValidatedAt": validation_time.isoformat()
}

validation_table_client.create_entity(entity=validation_record)
```

---

## Configuration & Credentials

### Environment Variables Required

**Stripe Configuration:**

| Variable Name | Description | Example Value | Required |
|--------------|-------------|---------------|----------|
| `STRIPE_SECRET_KEY` | Stripe API secret key | `sk_test_xxx` or `sk_live_xxx` | Yes |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | `whsec_xxx` | Yes |
| `STRIPE_SUCCESS_URL` | Checkout success redirect | `https://parq.app/payment-success` | No (has default) |
| `STRIPE_CANCEL_URL` | Checkout cancel redirect | `https://parq.app/payment-cancelled` | No (has default) |

**Azure Configuration:**

| Variable Name | Description | Required |
|--------------|-------------|----------|
| `AzureWebJobsStorage` | Azure Storage connection string | Yes |
| `FUNCTIONS_WORKER_RUNTIME` | Runtime environment | Yes (set to `python`) |

**Twilio Configuration (for SMS):**

| Variable Name | Description | Example Value | Required |
|--------------|-------------|---------------|----------|
| `TWILIO_ACCOUNT_SID` | Twilio account SID | `your_twilio_account_sid` | Yes (for SMS) |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | `your_twilio_auth_token` | Yes (for SMS) |
| `TWILIO_PHONE_NUMBER` | Twilio sender phone | `+1XXXXXXXXXX` | Yes (for SMS) |

**Function URLs (for service-to-service calls):**

| Variable Name | Description | Default |
|--------------|-------------|---------|
| `TWILIO_FUNCTION_URL` | Base URL for Twilio notification service | `http://localhost:7071/api` |
| `RENEWAL_FUNCTION_URL` | Base URL for renewal link generator | `http://localhost:7071/api` |

### Azure Function App Settings

**How to Set Environment Variables in Azure:**

1. Navigate to Azure Portal → Function Apps
2. Select your function app (e.g., `stripe-webhook-processor`)
3. Settings → Configuration → Application settings
4. Add each environment variable as a new setting
5. Click "Save" and restart the function app

**Production vs Development:**

- **Local Development:** Use `local.settings.json`
- **Production:** Use Azure Portal Application Settings (encrypted)

**local.settings.json Structure:**

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=xxx;AccountKey=xxx",
    "STRIPE_SECRET_KEY": "sk_test_xxx",
    "STRIPE_WEBHOOK_SECRET": "whsec_xxx",
    "STRIPE_SUCCESS_URL": "https://parq.app/payment-success",
    "STRIPE_CANCEL_URL": "https://parq.app/payment-cancelled",
    "TWILIO_ACCOUNT_SID": "SKxxx",
    "TWILIO_AUTH_TOKEN": "xxx",
    "TWILIO_PHONE_NUMBER": "+13852824762"
  }
}
```

### Obtaining Stripe Webhook Secret

**Steps to Get Webhook Signing Secret:**

1. Log in to Stripe Dashboard
2. Navigate to Developers → Webhooks
3. Click "Add endpoint" or select existing endpoint
4. Set endpoint URL to your Azure Function URL:
   - Example: `https://your-function-app.azurewebsites.net/api/stripeWebhook`
5. Select events to listen for: `checkout.session.completed`
6. Click "Add endpoint"
7. Click "Reveal" next to "Signing secret"
8. Copy the secret (starts with `whsec_`)
9. Add to Azure Function App Settings as `STRIPE_WEBHOOK_SECRET`

**Important:** Webhook secrets are different for test mode and live mode!

---

## Integration Points

### 1. Occupancy Table Integration

**Table:** `Occupancy`
**Purpose:** Computer vision detection results
**Updated By:** Parking detection function (`parking-detection-func-v2`)

**Schema:**
```python
{
    "PartitionKey": "LOT_IMAGES",
    "RowKey": "SPOT_01",  # SPOT_{number:02d}
    "SpotId": "1",
    "IsOccupied": True,
    "LastUpdateTime": "2024-11-15T14:30:00Z",
    "DetectionConfidence": 0.95,
    "VehicleType": "car",
    "Timestamp": datetime
}
```

**Integration Flow:**
1. Computer vision detects car → Updates `Occupancy.IsOccupied = True`
2. Webhook processes payment → Writes to `parkingfeedback`
3. Validation function queries both tables → Calculates violation status

### 2. Parkingfeedback Table Integration

**Table:** `parkingfeedback`
**Purpose:** Payment transaction records
**Updated By:** Stripe webhook handler

**Schema:**
```python
{
    "PartitionKey": "Transaction",
    "RowKey": "payment_{event_id}_{space_number}",
    "SpaceNumber": "15",
    "LicensePlate": "ABC123",
    "TimePaid": "2024-11-15T14:30:00-07:00",
    "Quantity": 1.0,
    "Amount": 2.50,
    "TimeExpires": "2024-11-15T15:30:00-07:00",
    "Email": "customer@example.com",
    "PhoneNumber": "+14807293879",
    "TextReminders": "yes",
    "Timestamp": datetime
}
```

**Query Patterns:**

```python
# Get active payment for a space
query_filter = f"PartitionKey eq 'Transaction' and SpaceNumber eq '{space_number}'"
payments = table_client.query_entities(query_filter=query_filter)

# Find most recent payment
most_recent = max(payments, key=lambda p: p.Timestamp)

# Check if payment is still valid
if current_time <= payment.TimeExpires:
    # Payment active
```

### 3. Twilio SMS Notification Integration

**Service:** Twilio notification service
**Function:** `twilio_notification_service`
**Location:** `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\validation-functions-app\twilio_notification_service\__init__.py`

**Integration Points:**

**A. Payment Confirmation SMS** (called by webhook handler)

```python
# Location: function_app.py, Lines 50-90
def send_payment_confirmation_sms(space_number, phone_number, time_expires):
    """Send payment confirmation SMS immediately after successful payment"""
    client = Client(account_sid, auth_token)

    message_body = f"""✅ PARQ Payment Confirmed!

Your parking payment for Space {space_number} is confirmed.

Valid until: {expires_formatted} (Mountain Time)

You'll receive reminders before expiration. Park safely!

Reply STOP to opt out."""

    message = client.messages.create(
        body=message_body,
        from_=twilio_phone,
        to=phone_number
    )
```

**B. 15-Minute Warning** (called by validation function)

Triggered when payment expires in 10-20 minutes:

```python
# Location: twilio_notification_service/__init__.py, Lines 96-135
message_body = f"""🅿️ PARQ Parking Alert

Your parking in Space {space_number} expires in 15 minutes!

Extend your parking now to avoid a violation:
{renewal_url}

Reply STOP to opt out of text messages."""
```

**C. Expiration Notice** (called by validation function)

Triggered when payment expired 0-10 minutes ago:

```python
# Location: twilio_notification_service/__init__.py, Lines 137-176
message_body = f"""⚠️ PARQ Parking EXPIRED

Your parking in Space {space_number} has EXPIRED!

You may receive a parking violation. Extend now:
{renewal_url}

Reply STOP to opt out of text messages."""
```

### 4. Renewal Link Generator Integration

**Function:** `renewal_link_generator`
**Purpose:** Creates pre-filled Stripe checkout for renewals
**Location:** `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\validation-functions-app\renewal_link_generator\__init__.py`

**How It Works:**

1. Receives space number from Twilio notification service
2. Queries `parkingfeedback` table for customer's previous payment
3. Retrieves email, phone, license plate from previous payment
4. Creates new Stripe checkout session with pre-filled data
5. Returns checkout URL for SMS inclusion

**Code Reference:**

```python
# Lines 62-119
def create_renewal_checkout_session(customer_data):
    """Create Stripe checkout session with pre-filled customer data for renewal"""
    checkout_params = {
        'payment_method_types': ['card'],
        'line_items': [{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': f'Parking Renewal - Space {customer_data["space_number"]}',
                    'description': f'1 Hour Parking Extension for Space {customer_data["space_number"]}'
                },
                'unit_amount': 200,  # $2.00 in cents
            },
            'quantity': 1,
        }],
        'mode': 'payment',
        'success_url': os.getenv('STRIPE_SUCCESS_URL'),
        'cancel_url': os.getenv('STRIPE_CANCEL_URL'),
        'customer_email': customer_data["email"]
    }

    checkout_session = stripe.checkout.Session.create(**checkout_params)
    return checkout_session.url
```

### 5. Validation Output Table

**Table:** `validationoutput`
**Purpose:** Historical violation records
**Updated By:** Continuous validation function

**Schema:**
```python
{
    "PartitionKey": "AutoValidation",
    "RowKey": "{space_number}_{uuid}",
    "SpaceNumber": "15",
    "IsOccupied": True,
    "IsPaid": True,
    "PaymentStatus": "ACTIVE",
    "ViolationStatus": "PAID",
    "ViolationType": "VALID_PAYMENT",
    "TimeDeltaMinutes": -5.2,
    "TimeRemainingMinutes": 45.0,
    "Message": "Space 15 PAID: 45.0 minutes remaining [License: ABC123]",
    "ValidatedAt": "2024-11-15T14:35:00Z",
    "DetectionTime": "2024-11-15T14:30:00Z",
    "PaymentExpiresAt": "2024-11-15T15:30:00-07:00",
    "LicensePlate": "ABC123",
    "Timestamp": datetime
}
```

**Violation Status Values:**
- `PAID` - Active payment with time remaining
- `WARNING` - Payment expiring soon (15-minute warning sent)
- `CURRENT_VIOLATION` - Payment expired since detection
- `VIOLATION` - Payment completed >5 minutes after detection
- `ERROR` - Calculation error

---

## Code Reference Guide

### Phone Number Normalization

**Function:** `normalize_phone_number()`
**Location:** `function_app.py`, Lines 19-48
**Purpose:** Convert various phone formats to Twilio-compatible +1XXXXXXXXXX format

**Supported Input Formats:**
- `(480) 729-3879` → `+14807293879`
- `480-729-3879` → `+14807293879`
- `4807293879` → `+14807293879`
- `14807293879` → `+14807293879`

**Code:**
```python
def normalize_phone_number(phone_str):
    """
    Normalize phone number to +1XXXXXXXXXX format for Twilio compatibility

    Args:
        phone_str: Phone number in various formats like "(480) 729-3879", "480-729-3879", etc.

    Returns:
        Normalized phone number in +1XXXXXXXXXX format, or None if invalid
    """
    if not phone_str:
        return None

    # Remove all non-digit characters
    digits_only = re.sub(r'[^\d]', '', phone_str)

    # Handle different cases
    if len(digits_only) == 10:
        # US number without country code: 4807293879 -> +14807293879
        return f"+1{digits_only}"
    elif len(digits_only) == 11 and digits_only.startswith('1'):
        # US number with country code: 14807293879 -> +14807293879
        return f"+{digits_only}"
    elif len(digits_only) == 11:
        # Assume it's a US number: 14807293879 -> +14807293879
        return f"+1{digits_only[-10:]}"
    else:
        # Return as-is if it doesn't match expected patterns, but log it
        logging.warning(f"Unusual phone number format: {phone_str} -> {digits_only}")
        return phone_str
```

### Payment Duration Calculation

**Location:** `function_app.py`, Lines 174-184
**Logic:** Determine parking duration from payment amount

**Code:**
```python
# Determine duration from amount paid - support 30min/1hour minimums
amount_total = session['amount_total'] / 100  # Convert cents to dollars
if amount_total >= 2.50:  # $2.50+ for 1 hour
    duration_hours = 1.0
    time_expires = time_paid + timedelta(hours=1)
elif amount_total >= 1.25:  # $1.25+ for 30 minutes
    duration_hours = 0.5
    time_expires = time_paid + timedelta(minutes=30)
else:
    # Fallback to session expiration or 1 hour default
    time_expires = datetime.fromtimestamp(session_expires, tz=local_tz) if session_expires else time_paid + timedelta(hours=1)
    duration_hours = (time_expires - time_paid).total_seconds() / 3600
```

### Custom Fields Extraction

**Location:** `function_app.py`, Lines 151-159
**Purpose:** Extract Stripe custom fields from checkout session

**Code:**
```python
# Get custom fields from the session
custom_fields = session.get('custom_fields', [])
for field in custom_fields:
    if field['key'] == 'spacenumber':
        space_number = str(field['numeric']['value'])
    elif field['key'] == 'licenseplatenumber':
        license_plate = field['text']['value']
    elif field['key'] == 'wouldyouliketoreceivetextreminders':
        text_reminders = field['dropdown']['value']
```

### Test Endpoint

**Function:** `test_webhook_connection()`
**Location:** `function_app.py`, Lines 260-298
**Route:** `/api/test`
**Purpose:** Verify webhook connectivity and configuration

**Returns:**
```json
{
  "status": "success",
  "database_connection": "OK",
  "stripe_api_key_configured": true,
  "webhook_secret_configured": true,
  "table_accessible": true,
  "entities_count": 5
}
```

---

## Testing & Debugging

### Local Development Setup

**1. Install Dependencies:**

```bash
cd stripeWebhookPP-update
pip install -r requirements.txt
```

**Requirements (requirements.txt):**
```
azure-functions==1.21.3
azure-data-tables==12.6.0
stripe==11.6.0
pytz==2024.1
twilio==9.2.3
requests==2.32.3
```

**2. Configure Local Settings:**

Create `local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "STRIPE_SECRET_KEY": "sk_test_your_test_key",
    "STRIPE_WEBHOOK_SECRET": "whsec_your_webhook_secret",
    "TWILIO_ACCOUNT_SID": "your_test_sid",
    "TWILIO_AUTH_TOKEN": "your_test_token",
    "TWILIO_PHONE_NUMBER": "+1234567890"
  }
}
```

**3. Run Function Locally:**

```bash
func start
```

Function will be available at: `http://localhost:7071/api/stripeWebhook`

### Testing with Stripe CLI

**Install Stripe CLI:**
```bash
brew install stripe/stripe-cli/stripe
# or
scoop install stripe
```

**Login to Stripe:**
```bash
stripe login
```

**Forward Webhooks to Local Function:**
```bash
stripe listen --forward-to http://localhost:7071/api/stripeWebhook
```

This will output a webhook signing secret like `whsec_xxx` - use this in your local.settings.json

**Trigger Test Webhook:**
```bash
stripe trigger checkout.session.completed
```

### Testing Payment Confirmation SMS

**Test Script:** `test_payment_confirmation.py`
**Location:** `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\test_payment_confirmation.py`

**Usage:**
```bash
python test_payment_confirmation.py
```

**What It Tests:**
- Phone number normalization
- Twilio client initialization
- SMS message formatting
- Payment confirmation delivery

### Logging & Monitoring

**Application Insights Integration:**

The function app is configured with Application Insights for monitoring (see `host.json`).

**Key Logs to Monitor:**

1. **Webhook Received:**
   ```
   "Stripe webhook received"
   ```

2. **Signature Verification:**
   ```
   "Invalid signature: {error}"
   ```

3. **Payment Processing:**
   ```
   "Payment processed for space {space_number}, license {license_plate}"
   "Time paid: {time_paid}"
   "Time expires: {time_expires}"
   ```

4. **SMS Sending:**
   ```
   "Payment confirmation SMS sent to {phone_number} for space {space_number}: {message_sid}"
   ```

**Common Log Queries (Application Insights):**

```kusto
// Failed webhook processing
traces
| where message contains "Webhook error"
| order by timestamp desc

// Successful payments
traces
| where message contains "Payment processed"
| project timestamp, space_number = extract("space (\\d+)", 1, message)
| order by timestamp desc

// SMS failures
traces
| where message contains "Failed to send payment confirmation SMS"
| order by timestamp desc
```

### Common Testing Scenarios

**Scenario 1: Complete Payment Flow**

1. Create Stripe checkout session with custom fields
2. Complete payment in test mode
3. Webhook receives `checkout.session.completed` event
4. Verify payment record in `parkingfeedback` table
5. Verify SMS sent to customer phone
6. Check validation function picks up payment

**Scenario 2: Payment Without Phone Number**

1. Create checkout without phone number
2. Complete payment
3. Webhook processes successfully
4. No SMS sent (logs show "No phone number provided")
5. Payment still recorded in database

**Scenario 3: Payment with SMS Opt-Out**

1. Create checkout with text_reminders = "no"
2. Complete payment
3. Webhook processes successfully
4. No SMS sent (logs show "Text reminders not enabled")
5. Payment recorded with TextReminders = "no"

---

## Custom Checkout Page Requirements

### Essential Requirements for Custom Checkout Integration

When building a custom Stripe checkout page, you must ensure it triggers the correct webhook events with the expected data structure.

### Required Stripe Checkout Session Parameters

**Minimum Required Parameters:**

```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',

  // LINE ITEMS (parking payment)
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: `Parking - Space ${spaceNumber}`,
        description: `${duration} hour parking for Space ${spaceNumber}`
      },
      unit_amount: amountInCents  // 250 for $2.50
    },
    quantity: 1
  }],

  // SUCCESS/CANCEL URLs
  success_url: 'https://parq.app/payment-success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://parq.app/payment-cancelled',

  // CUSTOM FIELDS (CRITICAL - webhook depends on these)
  custom_fields: [
    {
      key: 'spacenumber',
      label: { type: 'custom', custom: 'Space Number' },
      type: 'numeric',
      numeric: {
        minimum: 1,
        maximum: 99
      }
    },
    {
      key: 'licenseplatenumber',
      label: { type: 'custom', custom: 'License Plate Number' },
      type: 'text',
      text: {
        minimum_length: 2,
        maximum_length: 10
      }
    },
    {
      key: 'wouldyouliketoreceivetextreminders',
      label: { type: 'custom', custom: 'Would you like to receive text reminders?' },
      type: 'dropdown',
      dropdown: {
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]
      }
    }
  ],

  // CUSTOMER DETAILS (for SMS and email)
  customer_creation: 'always',
  phone_number_collection: { enabled: true },

  // SESSION EXPIRATION
  expires_at: Math.floor(Date.now() / 1000) + (30 * 60)  // 30 minutes
});
```

### Custom Field Requirements

**CRITICAL:** The webhook handler expects these exact custom field keys:

1. **spacenumber** (numeric field)
   - Type: `numeric`
   - Min: 1, Max: 99
   - Required: YES
   - Example: `15`

2. **licenseplatenumber** (text field)
   - Type: `text`
   - Min length: 2, Max length: 10
   - Required: NO (but recommended)
   - Example: `ABC123`

3. **wouldyouliketoreceivetextreminders** (dropdown field)
   - Type: `dropdown`
   - Options: `yes` or `no`
   - Required: NO
   - Default: `yes`
   - Controls whether payment confirmation SMS is sent

**Important:** Field keys are case-sensitive and must match exactly!

### Webhook Event Payload Your Checkout Must Trigger

Your custom checkout page must trigger this webhook event structure:

```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_xxx",
      "amount_total": 250,
      "currency": "usd",
      "payment_status": "paid",
      "status": "complete",

      "customer_details": {
        "email": "customer@example.com",
        "phone": "+14807293879"
      },

      "custom_fields": [
        {
          "key": "spacenumber",
          "numeric": { "value": 15 }
        },
        {
          "key": "licenseplatenumber",
          "text": { "value": "ABC123" }
        },
        {
          "key": "wouldyouliketoreceivetextreminders",
          "dropdown": { "value": "yes" }
        }
      ]
    }
  }
}
```

### Success/Failure Handling Requirements

**Success Flow:**

1. Stripe checkout completes successfully
2. Webhook receives `checkout.session.completed` event
3. Webhook processes payment and returns HTTP 200
4. Customer redirected to `success_url`
5. SMS confirmation sent (if opted-in)

**Your success page should:**
- Display confirmation message
- Show space number and expiration time
- Provide option to add to calendar
- Show renewal link for future use

**Failure Flow:**

1. Customer cancels or payment fails
2. Customer redirected to `cancel_url`
3. No webhook triggered (payment incomplete)

**Your cancel page should:**
- Explain what happened
- Provide option to try again
- Show contact info for support

### Metadata to Pass (Optional but Recommended)

While not currently used by the webhook handler, these metadata fields can help with future features:

```javascript
metadata: {
  lot_location: 'Main Street Lot',
  parking_zone: 'Zone A',
  vehicle_make: 'Toyota',
  vehicle_model: 'Camry',
  customer_notes: 'First-time parker'
}
```

### Phone Number Format Requirements

**Input:** Accept any common US phone format
**Processing:** Webhook automatically normalizes to +1XXXXXXXXXX

**Accepted Formats:**
- `(480) 729-3879`
- `480-729-3879`
- `480.729.3879`
- `4807293879`
- `+14807293879`
- `1-480-729-3879`

**All normalized to:** `+14807293879`

### Pre-filling Customer Data for Renewals

If implementing renewal functionality, pre-fill checkout with previous payment data:

```javascript
// Fetch previous payment data from your backend
const previousPayment = await fetchCustomerPreviousPayment(spaceNumber);

const session = await stripe.checkout.sessions.create({
  // ... other parameters ...

  // Pre-fill email
  customer_email: previousPayment.email,

  // Pre-fill custom fields (Stripe doesn't support this directly)
  // You'll need to handle this in your custom UI before redirecting to Stripe
});
```

**Note:** Stripe Checkout doesn't support pre-filling custom fields, so you may need to build a custom form that collects data before creating the session.

### Testing Your Custom Checkout

**Test Checklist:**

- [ ] Checkout session created with all required custom fields
- [ ] Payment completes successfully in test mode
- [ ] Webhook receives event within 5 seconds
- [ ] Payment record appears in `parkingfeedback` table
- [ ] Phone number normalized correctly
- [ ] SMS confirmation sent (if opted-in)
- [ ] Validation function picks up payment
- [ ] Expiration time calculated correctly
- [ ] Success page displays with correct data

**Test Card Numbers (Stripe Test Mode):**
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

**Test Phone Numbers (Twilio Test Mode):**
- Use real phone numbers in test mode
- Twilio sends actual SMS in test mode (charges apply)
- Or use Twilio test credentials for mock sending

---

## Common Issues & Solutions

### Issue 1: Webhook Not Receiving Events

**Symptoms:**
- Payment completes but no database record
- No SMS confirmation sent
- Logs show no webhook received

**Diagnosis:**
```bash
# Check Stripe webhook dashboard
# Verify endpoint URL matches function URL
# Check webhook event delivery logs
```

**Solutions:**

1. **Verify Webhook Endpoint URL:**
   - Azure Function URL: `https://your-app.azurewebsites.net/api/stripeWebhook`
   - Stripe Dashboard → Webhooks → Check endpoint URL
   - Ensure no typos or extra paths

2. **Check Webhook Events Selected:**
   - Must include `checkout.session.completed`
   - Stripe Dashboard → Webhooks → Edit endpoint → Events to send

3. **Verify Function App is Running:**
   ```bash
   # Test endpoint
   curl https://your-app.azurewebsites.net/api/test
   ```

4. **Check Azure Function Logs:**
   ```bash
   # Azure Portal → Function App → Log stream
   # Look for incoming requests
   ```

---

### Issue 2: Signature Verification Failed

**Symptoms:**
- Webhook received but returns 400 error
- Logs show "Invalid signature"
- Payment not recorded

**Error Message:**
```
"Invalid signature: No signatures found matching the expected signature for payload"
```

**Solutions:**

1. **Verify Webhook Secret:**
   - Get signing secret from Stripe Dashboard → Webhooks → Select endpoint → Reveal secret
   - Ensure it matches `STRIPE_WEBHOOK_SECRET` in Azure Function settings
   - Test mode and live mode have different secrets!

2. **Check for Secret Mismatch:**
   ```bash
   # Azure Portal → Function App → Configuration
   # Verify STRIPE_WEBHOOK_SECRET value
   # Should start with whsec_
   ```

3. **Restart Function App:**
   - After updating webhook secret, restart the function app
   - Azure Portal → Function App → Restart

4. **Test with Stripe CLI:**
   ```bash
   stripe listen --forward-to https://your-app.azurewebsites.net/api/stripeWebhook
   # This will show the correct webhook secret to use
   ```

---

### Issue 3: SMS Not Sending

**Symptoms:**
- Payment recorded successfully
- Webhook returns 200
- Customer doesn't receive SMS
- Logs show "Failed to send payment confirmation SMS"

**Diagnosis:**
```python
# Check logs for Twilio errors
# Look for:
# "Twilio credentials not configured"
# "Failed to send payment confirmation SMS: {error}"
```

**Solutions:**

1. **Verify Twilio Credentials:**
   ```bash
   # Azure Portal → Function App → Configuration
   # Check:
   # - TWILIO_ACCOUNT_SID
   # - TWILIO_AUTH_TOKEN
   # - TWILIO_PHONE_NUMBER
   ```

2. **Check Phone Number Format:**
   - Ensure phone number from Stripe is valid
   - Check normalization logs
   - Verify Twilio supports destination country

3. **Verify Twilio Phone Number:**
   - Twilio Console → Phone Numbers
   - Ensure number is active and SMS-enabled
   - Check account balance

4. **Check Customer Opt-In:**
   - Ensure `text_reminders` custom field = "yes"
   - Check payment record in database
   - Logs should show "Text reminders not enabled" if opted out

5. **Test SMS Directly:**
   ```bash
   python test_payment_confirmation.py
   ```

---

### Issue 4: Payment Record Not Found by Validation

**Symptoms:**
- Payment recorded in `parkingfeedback` table
- Validation function doesn't detect payment
- Space shows as violation despite valid payment

**Diagnosis:**
```sql
-- Check payment record structure
-- Query parkingfeedback table
-- Verify PartitionKey and SpaceNumber
```

**Solutions:**

1. **Verify PartitionKey:**
   - Webhook creates: `PartitionKey = "Transaction"`
   - Validation queries: `PartitionKey eq 'Transaction'`
   - Must match exactly (case-sensitive)

2. **Check SpaceNumber Format:**
   - Webhook stores as string: `"15"`
   - Validation queries: `SpaceNumber eq '15'`
   - Ensure consistent string format

3. **Verify Query Logic:**
   ```python
   # Validation function queries both formats
   # Current: SpaceNumber eq '15'
   # Legacy: PartitionKey eq 'Transaction' and SpaceNumber eq '15'
   ```

4. **Check Time Zone Issues:**
   - Ensure all times stored in consistent timezone
   - Webhook uses Mountain Time (America/Denver)
   - Validation should handle timezone conversions

---

### Issue 5: Custom Fields Not Extracted

**Symptoms:**
- Webhook processes event
- Space number is None or empty
- Error: "No space number found in webhook data"

**Error Message:**
```
"No space number found in webhook data"
```

**Solutions:**

1. **Verify Custom Field Keys:**
   - Must be exactly: `spacenumber`, `licenseplatenumber`, `wouldyouliketoreceivetextreminders`
   - Case-sensitive!
   - No spaces or special characters

2. **Check Field Types:**
   - `spacenumber`: Must be `numeric` type
   - `licenseplatenumber`: Must be `text` type
   - `wouldyouliketoreceivetextreminders`: Must be `dropdown` type

3. **Inspect Webhook Payload:**
   ```bash
   # Stripe Dashboard → Webhooks → Recent events
   # Click on event → View payload
   # Check custom_fields array structure
   ```

4. **Test with Stripe CLI:**
   ```bash
   stripe trigger checkout.session.completed
   # Check if custom fields are included
   ```

---

### Issue 6: Time Zone Calculation Issues

**Symptoms:**
- Payment expires at wrong time
- Validation shows incorrect time remaining
- SMS shows wrong expiration time

**Diagnosis:**
```python
# Check logs for:
# "Time paid (MST): {time_paid}"
# "Time expires (from Stripe): {time_expires}"
```

**Solutions:**

1. **Verify Mountain Time Conversion:**
   ```python
   # Webhook should use: pytz.timezone('America/Denver')
   # Check time_paid calculation
   ```

2. **Check ISO Format:**
   - All times should be stored in ISO format
   - Include timezone: `2024-11-15T14:30:00-07:00`

3. **Ensure Consistent Timezone Handling:**
   - Webhook: Mountain Time
   - Validation: UTC (converts to Mountain Time for display)

---

### Issue 7: Duplicate Payment Records

**Symptoms:**
- Multiple payment records for same space
- Customer charged multiple times
- Conflicting validation results

**Diagnosis:**
```python
# Check for duplicate RowKeys
# Query: PartitionKey eq 'Transaction'
# Group by SpaceNumber
```

**Solutions:**

1. **Ensure Idempotent Processing:**
   - RowKey includes event ID: `payment_{event_id}_{space_number}`
   - Stripe sends same event multiple times if not acknowledged
   - Return 200 quickly to prevent retries

2. **Check for Multiple Webhooks:**
   - Stripe Dashboard → Webhooks
   - Ensure only one endpoint configured
   - Delete duplicate endpoints

3. **Implement Duplicate Detection:**
   ```python
   # Check if RowKey exists before inserting
   try:
       table_client.get_entity(partition_key="Transaction", row_key=row_key)
       # Already processed
       return func.HttpResponse("Already processed", status_code=200)
   except ResourceNotFoundError:
       # Process payment
   ```

---

### Issue 8: Payment Amount Calculation Wrong

**Symptoms:**
- Wrong parking duration calculated
- Customer pays for 1 hour but gets 30 minutes
- Expiration time incorrect

**Diagnosis:**
```python
# Check logs for:
# "Amount total: {amount_total}"
# "Duration hours: {duration_hours}"
```

**Solutions:**

1. **Verify Amount Logic:**
   ```python
   # $2.50+ = 1 hour
   # $1.25-$2.49 = 30 minutes
   # Check if statement conditions are correct
   ```

2. **Check Stripe Amount Format:**
   - Stripe returns cents: `250` = $2.50
   - Webhook divides by 100: `amount_total / 100`

3. **Ensure Consistent Pricing:**
   - Checkout session: `unit_amount: 250` (cents)
   - Webhook expects: `$2.50` (dollars after conversion)

---

## Appendix: File Locations Reference

**Quick reference for all files mentioned in this document:**

| Component | File Path | Lines of Code |
|-----------|-----------|---------------|
| **Stripe Webhook Handler** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\stripeWebhookPP-update\function_app.py` | 298 |
| **Requirements** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\stripeWebhookPP-update\requirements.txt` | 6 |
| **Host Config** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\stripeWebhookPP-update\host.json` | 15 |
| **Local Settings** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\stripeWebhookPP-update\local.settings.json` | 7 |
| **Continuous Validation** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\validation-functions-app\continuous_validation\__init__.py` | 577 |
| **Twilio Notification Service** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\validation-functions-app\twilio_notification_service\__init__.py` | 275 |
| **Renewal Link Generator** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\validation-functions-app\renewal_link_generator\__init__.py` | 196 |
| **Payment Confirmation Test** | `C:\Users\oneco\OneDrive\Desktop\Projects\updatedcarDetection\test_payment_confirmation.py` | 114 |

---

## Appendix: Azure Table Storage Schemas

**Complete schemas for all tables used in the payment flow:**

### parkingfeedback Table

```python
{
    "PartitionKey": "Transaction",  # Constant for all payments
    "RowKey": "payment_{event_id}_{space_number}",  # Unique identifier
    "SpaceNumber": "15",  # String
    "LicensePlate": "ABC123",  # String, optional
    "TimePaid": "2024-11-15T14:30:00-07:00",  # ISO format with timezone
    "Quantity": 1.0,  # Float (hours)
    "Amount": 2.50,  # Float (dollars)
    "TimeExpires": "2024-11-15T15:30:00-07:00",  # ISO format with timezone
    "Email": "customer@example.com",  # String, optional
    "PhoneNumber": "+14807293879",  # String (normalized), optional
    "TextReminders": "yes",  # String: "yes" or "no"
    "Timestamp": datetime  # Auto-generated by Azure
}
```

### Occupancy Table

```python
{
    "PartitionKey": "LOT_IMAGES",  # Constant for all spots
    "RowKey": "SPOT_15",  # Format: SPOT_{number:02d}
    "SpotId": "15",  # String
    "IsOccupied": True,  # Boolean
    "LastUpdateTime": "2024-11-15T14:30:00Z",  # UTC ISO format
    "DetectionConfidence": 0.95,  # Float (0.0 to 1.0)
    "VehicleType": "car",  # String: "car", "truck", "motorcycle", etc.
    "Timestamp": datetime  # Auto-generated by Azure
}
```

### validationoutput Table

```python
{
    "PartitionKey": "AutoValidation",  # Or "ManualValidation"
    "RowKey": "15_{uuid}",  # Format: {space_number}_{uuid}
    "SpaceNumber": "15",  # String
    "SpotRowKey": "SPOT_15",  # Reference to Occupancy table
    "IsOccupied": True,  # Boolean
    "DetectionConfidence": 0.95,  # Float
    "VehicleType": "car",  # String
    "IsPaid": True,  # Boolean
    "PaymentStatus": "ACTIVE",  # String
    "PaymentQuantityHours": 1.0,  # Float
    "LicensePlate": "ABC123",  # String
    "DetectionTime": "2024-11-15T14:30:00Z",  # UTC ISO format
    "PaymentExpiresAt": "2024-11-15T15:30:00-07:00",  # ISO with timezone
    "PaymentStartTime": "2024-11-15T14:30:00-07:00",  # ISO with timezone
    "TimeDeltaMinutes": -5.2,  # Float (negative = payment before detection)
    "TimeRemainingMinutes": 45.0,  # Float
    "CurrentVsExpirationMinutes": -45.0,  # Float
    "ViolationStatus": "PAID",  # String: PAID, WARNING, VIOLATION, CURRENT_VIOLATION
    "ViolationType": "VALID_PAYMENT",  # String
    "TimeDescription": "45.0 minutes remaining",  # String
    "NeedsNotification": False,  # Boolean
    "Message": "Space 15 PAID: 45.0 minutes remaining [License: ABC123]",  # String
    "ValidatedAt": "2024-11-15T14:35:00Z",  # UTC ISO format
    "ValidationSource": "Timer",  # String: Timer or Manual
    "Timestamp": datetime  # Auto-generated by Azure
}
```

### notificationlogs Table

```python
{
    "PartitionKey": "SMS_NOTIFICATIONS",  # Constant
    "RowKey": "15_20241115_143000_{message_sid}",  # Format: {space}_{datetime}_{sid}
    "SpaceNumber": "15",  # String
    "PhoneNumber": "+14807293879",  # String (normalized)
    "MessageType": "15_MINUTE_WARNING",  # String: 15_MINUTE_WARNING, EXPIRATION_NOTICE, PAYMENT_CONFIRMATION
    "MessageSid": "SM1234567890abcdef",  # Twilio message SID
    "MessageBody": "Your parking expires in 15 minutes...",  # String
    "SentAt": "2024-11-15T14:30:00Z",  # UTC ISO format
    "Status": "SENT",  # String: SENT, FAILED
    "Timestamp": datetime  # Auto-generated by Azure
}
```

---

## Contact & Support

**For questions about this implementation:**

- **Backend Repository:** `updatedcarDetection`
- **Frontend Repository:** `Parq-website`
- **Branch:** `azure-latest-with-webhooks`
- **Last Updated:** September 6, 2024
- **Git Commits:**
  - `f36b9ae` - Add Azure latest version with webhook integration
  - `df0244a` - Add Stripe webhook integration and enhanced validation timing
  - `726a05d` - Implement secured Twilio notification system

**Key Contributors:**
- Stripe webhook integration (September 2024)
- Twilio SMS notification system (September 2024)
- Validation timing enhancements (September 2024)

---

**END OF DOCUMENTATION**

This document is stored in the Parq website repository for easy access during custom checkout page development.
Path: `D:\Parq-website\docs\integration\STRIPE_WEBHOOK_INTEGRATION.md`
