/**
 * Payment methods available in P24. Not to be confused with Channels. No mention in API docs, retrieved from account details.
 *
 * @export
 * @enum {number}
 */
export enum PaymentMethod {
    SANTANDER_PRZELEW24 = 20,
    INTELIGO = 26,
    IPKO_PKO_BP = 31,
    CREDIT_AGRICOLE = 45,
    TOYOTA_BANK = 64,
    BANK_PEKAO_SA = 65,
    PAYPAL = 66,
    VOLKSWAGEN_BANK = 69,
    BANK_MILLENNIUM = 85,
    ALIOR_BANK = 88,
    BOS = 99,
    ING = 112,
    CITIHANDLOWY = 119,
    PLUS_BANK = 131,
    E_TRANSFER_POCZTOWY24 = 141,
    BANKI_SPOLDZIELCZE = 143,
    BANK_NOWY_SA = 144,
    VELOBANK = 153,
    BLIK = 154,
    USE_PREPAYMENT = 177,
    TRADITIONAL_TRANSFER = 178,
    NESTPRZELEW = 222,
    BNP_PARIBAS_PLACE_Z_PLANET = 223,
    GOOGLE_PAY = 238,
    APPLEPAY = 239,
    CARD = 241,
    MBANK_MTRANSFER = 243,
    MBANK_ITP = 270,
    ING_BANK_SLASKI_ITP = 271,
    BNP_PARIBAS_ITP = 272,
    BANK_PEKAO_SA_ITP = 273,
    PKO_BP_ITP = 274,
    SANTANDER_ITP = 275,
    MILLENIUM_ITP = 276,
    INTELIGO_ITP = 279,
    VISA_MOBILE = 282,
    PRZELEWY24_RATY = 303
}
