import {Country, PaymentMethod, RiskScore} from "../enums";

/**
 * Notification request
 *
 * @export
 * @interface NotificationRequest
 */
export interface NotificationRequest {
    /**
     * Merchant identification number
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    merchantId: number;

    /**
     * Shop identification number (defaults to merchant ID)
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    posId: number;

    /**
     * Unique identifier from merchant's system
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    sessionId: string;

    /**
     * Transaction amount expressed in the lowest currency unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    amount: number;

    /**
     * Transaction amount expressed in the lowest currency unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    originAmount: number;

    /**
     * Currency compatible with ISO, e.g. PLN
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    currency: string;

    /**
     * Transaction number assigned by P24
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    orderId: number;

    /**
     * Payment method used by a customer
     *
     * @type {number}
     * @memberof NotificationRequest
     */
    methodId: number;

    /**
     * Payment title
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    statement: string;

    /**
     * Checksum of parameters:
     * {"merchantId": int, "posId": int, "sessionId": "string", "amount": int, "originAmount": int, "currency": "string", "orderId": int, "methodId": int, "statement": string, "crc": "string"}
     *
     * calculated with the use of sha384
     *
     * @type {string}
     * @memberof NotificationRequest
     */
    sign: string;
}


/**
 * Card notification request
 *
 * @export
 * @interface CardNotificationRequest
 */
export interface CardNotificationRequest {
    /**
     * Transaction amount expressed in the lowest currency unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof CardNotificationRequest
     */
    amount: number;


    /**
     * Whether the transaction was 3DS protected
     *
     * @type {number}
     * @memberof CardNotificationRequest
     */
    '3ds': number;

    /**
     * Payment method used by a customer
     *
     * @type {PaymentMethod}
     * @memberof CardNotificationRequest
     */
    method: PaymentMethod;

    /**
     * Reference card ID
     *
     * @type {string}
     * @memberof CardNotificationRequest
     **/
    refId: string;

    /**
     * Transaction number assigned by P24 for 1-click probing
     *
     * @type {number}
     * @memberof CardNotificationRequest
     */
    orderId: number;

    /**
     * Unique identifier from merchant's system
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    sessionId: string;


    /**
     * BIN of the card used
     *
     * @type {number}
     * @memberof CardNotificationRequest
     */
    bin: number

    /**
     * Masked card number
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    maskedCCNumber: string;

    /**
     * Card expiration date in MMYYYY format, e.g. 122020
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    ccExp: string;

    /**
     * Unique card's hash
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    hash: string;

    /**
     * Card country in ISO format
     *
     * @type {Country}
     * @memberof CardNotificationRequest
     */
    cardCountry: Country;

    /**
     * Risk score. 0 - safe, 1 - suspicious, 2 - fraudulent
     *
     * @type {RiskScore}
     * @memberof CardNotificationRequest
     */
    risk: RiskScore;


    /**
     * Liability shift of fraudulent transactions from the merchant to card issuer or payment processor
     *
     * @type {boolean}
     * @memberof CardNotificationRequest
     */
    liabilityShift: boolean;


    /**
     * Card type/issuer. Not documented
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    cardType: string;


    /**
     * Checksum of parameters:
     * {"amount":int,"3ds":boolean,"method":int,"refId":"str","orderId":int,"sessionId":"str",
     * "bin":int,"maskedCCNumber":"str","ccExp":"str","hash":"str",
     * "cardCountry":"str","risk":int,"liabilityshift":boolean,"crc":"str"}
     *
     * calculated with the use of sha384
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    sign: string;

    /**
     * Optional error code.
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    errorCode?: string;

    /**
     * Optional error message.
     *
     * @type {string}
     * @memberof CardNotificationRequest
     */
    errorMessage?: string;

}
