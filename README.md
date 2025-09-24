# Przelewy24 for Node.js

Node.js Library for [**Przelewy24**](https://przelewy24.pl/).
This library is written in TypeScript to provide the best typesafety and provides an elegant way to create and verify
transactions.

## Documentation

No ugly or useless empty documentation. Reading [src/p24/P24.ts](src/p24/P24.ts) or examples below should be enough.

## Installation

```bash
npm install @mrboombastic/node-przelewy24
```

## Examples

### Importing

```typescript
import {
    P24,
    Order,
    Currency,
    Country,
    Language,
    NotificationRequest,
    Verification,
    Status
} from "node-przelewy24";
```

### Initialization

- **merchantId**: account ID given by P24
- **posId**: given by P24 (often the same as merchant ID)
- **apiKey**: API key from a P24 panel (sometimes called "key for reports")
- **crcKey**: CRC value obtained from P24 panel

```typescript
const p24 = new P24({
        merchantId: 0,
        posId: 0,
        apiKey: "sometimes-called-key-for-reports",
        crcKey: "",
        sandbox: false // enable or disable sandbox
    }
);
```

### Testing access to P24

```typescript
const result = await p24.testAccess();
console.log(result); // true on success or throws P24Error
```

### Get payment link

Prepare the following details to initiate a payment

```typescript
const order: Order = {
    sessionId: "c837e1a3-c5a3-4e89-adf1-05faffd8913b",
    amount: 1000, // Transaction amount expressed in lowest currency unit, e.g., 1.23 PLN = 123
    currency: Currency.PLN,
    description: "testing order",
    email: "john.doe@example.com",
    country: Country.Poland,
    language: Language.PL,
    urlReturn: "https://myawesomeapp.com/continue",
    urlStatus: "https://myawesomeapp.com/p24callback", // callback to get notification
    timeLimit: 15, // 15min
    encoding: Encoding.UTF8,
}
const result = await p24.createTransaction(order)
console.log(result) // prints a valid url to pay the payment or throws an error
```

### Verify Notification

P24 will send you a notification to the `urlStatus` provided in
transaction order. You need to **verify** this Notification request before actually **Verify Transaction**

```typescript
const verify: NotificationRequest = req.body
const result = p24.verifyNotification(verify)
console.log(result) // true when the notification is valid
```

### Verify Card Notification

P24 can send you a notification to the `urlCardPaymentNotification` provided optionally in transaction order.
This is different from BLIK notification, although it uses the same parameter.

```typescript
const verify: CardNotificationRequest = req.body
const result = p24.verifyCardNotification(verify)
console.log(result) // true when the notification is valid
```

### Verify a transaction with P24

To accept the payment to your merchant account, after validating the Notification
request, you need to verify the transaction with a P24 system.
**If you don't do that, the funds will not be transferred into your account**.

```typescript
// extract all information from callback request
const verifyRequest: Verification = {
    amount: 1000,
    currency: Currency.PLN,
    orderId: 3030,
    sessionId: 'c837e1a3-c5a3-4e89-adf1-05faffd8913b'
}

const result = await p24.verifyTransaction(verifyRequest)
console.log(result) // true on success otherwise P24Error
```

### Refund requesting

To refund the customer, you need to open up a refund request.

```typescript
const ref = {
    refundsUuid: '94c1fb0b-f40f-4201-b2a0-f4166839d06c',
    requestId: 'afa379ac-c3ca-43d0-892f-e7a3f13ee4cc',
    refunds: [
        {
            amount: 1000,
            description: 'testing',
            orderId: 3030,
            sessionId: 'c837e1a3-c5a3-4e89-adf1-05faffd8913b'
        }
    ],
}

const result = await p24.refund(ref)
console.log(result) // returns a SuccessResponse<RefundResult[]> where you can find about each refund request in array
```

### Getting transaction status by sessionId

```ts
const result = await p24.getTransaction("sessionId")
console.log(result) // returns a SuccessResponse<GetTransactionData>
console.log(result.status === Status.SUCCESS)
```

### Charging card

```ts
const result = await p24.chargeCard("XXXXXXXXXX-XXXXXX-XXXXXX-XXXXXXXXXX")
console.log(result.orderId) // returns a SuccessResponse<ChargeCardResult>
```

### Validate IP

Library provides a method to validate IP addresses with P24 backends.

```typescript
const valid = p24.isIpValid("127.0.0.1");
console.log(valid); // false if IP is not from P24
```
