/**
 * Shipping type
 *
 * @export
 * @enum {number}
 */
export enum ShippingType {
    Courier = 0,
    DeliveryPoint = 1,
    ParcelLocker = 3,
    PackageInAShop = 4
}

/**
 * Risk score
 *
 * @enum {number}
 */
export enum RiskScore {
    Safe = 0,
    Suspicious = 1,
    Fraudulent = 2
}

/**
 * Language: one of the following language codes according to ISO 639-1: bg, cs, de, en, es, fr, hr, hu, it, nl, pl, pt, se, sk, ro.
 *
 * @enum {string}
 */
export enum Language {
    BG = 'bg',
    CS = 'cs',
    DE = 'de',
    EN = 'en',
    ES = 'es',
    FR = 'fr',
    HR = 'hr',
    HU = 'hu',
    IT = 'it',
    NL = 'nl',
    PL = 'pl',
    PT = 'pt',
    SE = 'se',
    SK = 'sk',
    RO = 'ro'
}

/**
 * Transaction states. No mention in API docs
 * @export
 * @enum {number}
 * @memberOf GetTransactionData
 */

export enum Status {
    NEW = 0,
    INVALID_AMOUNT = 1,
    SUCCESS = 2,
}

/**
 * Character Encoding
 *
 * @enum {number}
 */
export enum Encoding {
    ISO8859 = 'ISO-8859-2',
    UTF8 = 'UTF-8',
    WINDOWS1250 = 'Windows-1250'
}


/**
 * Currency Type
 *
 * @enum {string}
 */
export enum Currency {
    PLN = 'PLN',
    EUR = 'EUR',
    GBP = 'GPB',
    CZK = 'CZK'
}


/**
 * Channels of payment
 *
 * @export
 * @enum {number}
 */
export enum Channel {
    CardsAppleGooglePay = 1,
    Transfer = 2,
    TraditionalTransfer = 4,
    All24_7 = 16,
    UsePrePayment = 32,
    OnlyPayByLink = 64,
    InstallmentPayment = 128,
    Wallets = 256,
    Cards = 4096,
    Blik = 8192,
    AllExceptBlik = 16384
}
