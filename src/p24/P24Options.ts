/**
 * P24 client options - API key, sandbox mode, etc.
 *
 * @export
 * @interface P24Options
 */
export interface P24Options {
    /**
     * Use sandbox (sandbox.przelewy24.pl) or production mode (secure.przelewy24.pl)
     *
     * @type {boolean}
     * @memberof P24Options
     */
    sandbox?: boolean

    /**
     * Basically an account ID
     *
     * @type {number}
     * @memberOf P24Options
     */
    merchantId: number,

    /**
     * No idea what it is, but there is a great chance that this is the same as merchantID
     *
     * @type {number}
     * @memberOf P24Options
     */
    posId: number,

    /**
     * API Key, sometimes called as "key for reports"
     *
     * @type {string}
     * @memberOf P24Options
     */
    apiKey: string,

    /**
     * CRC key
     *
     * @type {string}
     * @memberOf P24Options
     */
    crcKey: string,
}
