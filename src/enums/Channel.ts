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
