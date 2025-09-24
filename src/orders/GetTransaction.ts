import {PaymentMethod, Status} from "../enums";

/**
 * Transaction details retrieved from P24
 *
 * @export
 * @interface GetTransactionData
 */
export interface GetTransactionData {
    /**
     * Order identifier
     *
     * @type {number}
     * @memberof Transaction
     */
    orderId: number;

    /**
     * Unique session identifier
     *
     * @type {string}
     * @memberof Transaction
     */
    sessionId: string;

    /**
     * Transaction status.
     *
     * @type {Status}
     * @memberof Transaction
     */
    status: Status;

    /**
     * Transaction amount expressed in the lowest currency unit
     *
     * @type {number}
     * @memberof Transaction
     */
    amount: number;

    /**
     * Currency code
     *
     * @type {string}
     * @memberof Transaction
     */
    currency: string;

    /**
     * Transaction date
     *
     * @type {string}
     * @memberof Transaction
     */
    date: string;

    /**
     * Date when the transaction was processed
     *
     * @type {string}
     * @memberof Transaction
     */
    dateOfTransaction: string;

    /**
     * Client's email address
     *
     * @type {string}
     * @memberof Transaction
     */
    clientEmail: string;

    /**
     * MD5 hash of account information
     *
     * @type {string}
     * @memberof Transaction
     */
    accountMD5: string;

    /**
     * Payment method identifier
     *
     * @type {PaymentMethod}
     * @memberof Transaction
     */
    paymentMethod: PaymentMethod;

    /**
     * Transaction description
     *
     * @type {string}
     * @memberof Transaction
     */
    description: string;

    /**
     * Client's name
     *
     * @type {string}
     * @memberof Transaction
     */
    clientName: string;

    /**
     * Client's address
     *
     * @type {string}
     * @memberof Transaction
     */
    clientAddress: string;

    /**
     * Client's city
     *
     * @type {string}
     * @memberof Transaction
     */
    clientCity: string;

    /**
     * Client's postal code
     *
     * @type {string}
     * @memberof Transaction
     */
    clientPostcode: string;

    /**
     * Batch identifier
     *
     * @type {number}
     * @memberof Transaction
     */
    batchId: number;

    /**
     * Transaction fee
     *
     * @type {string}
     * @memberof Transaction
     */
    fee: string;

    /**
     * Transaction statement
     *
     * @type {string}
     * @memberof Transaction
     */
    statement: string;
}


