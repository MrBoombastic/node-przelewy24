/**
 * Base request
 *
 * @interface BaseParameters
 */
export interface BaseParameters {
    /**
     * Merchant ID
     *
     * @type {number}
     * @memberof BaseParameters
     */
    merchantId: number;
    /**
     * Shop ID (default Merchant ID)
     *
     * @type {number}
     * @memberof BaseParameters
     */
    posId: number;
}
