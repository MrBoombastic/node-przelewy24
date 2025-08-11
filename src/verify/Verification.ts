import {Currency} from '../enums';

/**
 * Transaction verification
 *
 * @export
 * @interface Verification
 */
export interface Verification {
    /**
     * Session ID from merchant's system
     *
     * @type {string}
     * @memberof Verification
     */
    sessionId: string;

    /**
     * Transaction amount which format is presented as amount in lowest currency
     * unit, e.g. 1.23 PLN = 123
     *
     * @type {number}
     * @memberof Verification
     */
    amount: number;
    /**
     * Currency
     *
     * @type {Currency | string}
     * @memberof Verification
     */
    currency: Currency | string;

    /**
     * Id of an order
     *
     * @type {number}
     * @memberof Verification
     */
    orderId: number;
}
