/**
 * Charge result
 *
 * @export
 * @interface ChargeCardResult
 */
export interface ChargeCardResult {
    /**
     * Data object with registered transaction ID
     * @type {{ orderID: number }}
     * @memberof ChargeCardResult
     */
    data:
        {
            orderID: number
        }
}
