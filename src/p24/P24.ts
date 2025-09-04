import Axios, {AxiosInstance} from 'axios';
import {P24Error} from '../errors';
import {P24Options} from './P24Options';
import {validIps} from './ips';
import {ErrorResponse, SuccessResponse} from '../responses';
import {BaseParameters} from './BaseParameters';
import {calculateSHA384} from '../utils/hash';
import {Order, OrderCreatedData, Transaction} from '../orders';
import {
    EndpointRefund,
    EndpointTestAccess,
    EndpointTransactionRegister,
    EndpointTransactionRequest,
    EndpointTransactionVerify,
    ProductionUrl,
    SandboxUrl
} from './endpoints';
import {NotificationRequest, Verification, VerificationData} from '../verify';
import {RefundRequest, RefundResult} from '../refund';

/**
 * Represents a P24 payment system
 *
 * @export
 * @class P24
 */
export class P24 {
    private client: AxiosInstance;
    private readonly baseUrl: string;
    private options: P24Options;
    private readonly baseParameters: BaseParameters;

    private isValidP24Options(options: any): options is P24Options {
        return typeof options === 'object' &&
            'merchantId' in options &&
            typeof options.merchantId === 'number' &&
            'posId' in options &&
            typeof options.posId === 'number' &&
            'crcKey' in options &&
            typeof options.crcKey === 'string' &&
            'apiKey' in options &&
            typeof options.apiKey === 'string' &&
            'sandbox' in options &&
            typeof options.sandbox === 'boolean';
    }

    /**
     * Creates an instance of Przelewy24.
     * @param {P24Options} [options={ sandbox: false }] - all necessary options
     * @memberof P24
     */
    constructor(
        options: P24Options = {sandbox: false, merchantId: 0, posId: 0, crcKey: '', apiKey: ''},
    ) {
        if (!this.isValidP24Options(options)) {
            throw new P24Error('Invalid P24Options provided', -1);
        }
        this.options = options
        if (!this.options.posId) this.options.posId = this.options.merchantId;

        this.baseUrl = this.options.sandbox ? SandboxUrl : ProductionUrl;

        this.baseParameters = {
            merchantId: this.options.merchantId,
            posId: this.options.posId
        };

        this.client = Axios.create({
            baseURL: `${this.baseUrl}/api/v1`,
            auth: {
                username: this.options.posId.toString(),
                password: this.options.apiKey
            }
        });

        if (this.options.debug) {
            this.client.interceptors.request.use(req => {
                console.log('[P24 DEBUG] Request:', req.data);
                return req;
            });
            this.client.interceptors.response.use(res => {
                console.log('[P24 DEBUG] Response:', res.data);
                return res;
            });
        }
    }

    /**
     * Test access to the service
     *
     * @returns {Promise<boolean>}
     * @throws {P24Error}
     * @memberof P24
     */
    public async testAccess(): Promise<boolean> {
        try {
            const {data} = await this.client.get(EndpointTestAccess)
            const res = <SuccessResponse<boolean>>data
            return res.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                const resp = <ErrorResponse<string>>error.response.data
                throw new P24Error(resp.error, resp.code)
            }
            throw new P24Error(`Unknown Error ${error}`, -1)
        }
    }

    /**
     * Creates a transaction
     *
     * @param {Order} order - order to be created
     * @returns {Promise<Transaction>}
     * @throws {P24Error}
     * @memberof P24
     */
    public async createTransaction(order: Order): Promise<Transaction> {
        try {
            const hashData = {
                sessionId: order.sessionId,
                merchantId: this.options.merchantId,
                amount: order.amount,
                currency: order.currency,
                crc: this.options.crcKey
            }

            const sign = calculateSHA384(JSON.stringify(hashData))

            const orderData = {
                ...this.baseParameters,
                ...order,
                sign,
            }

            const {data} = await this.client.post(EndpointTransactionRegister, orderData)
            const response = <SuccessResponse<OrderCreatedData>>data
            return {
                token: response.data.token,
                link: `${this.baseUrl}${EndpointTransactionRequest}/${response.data.token}`
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const resp = <ErrorResponse<string>>error.response.data
                throw new P24Error(resp.error, resp.code)
            }
            throw new P24Error(`Unknown Error ${error}`, -1)
        }
    }


    /**
     * Verify transaction
     *
     * @param {Verification} verification - verification request
     * @returns {Promise<boolean>}
     * @throws {P24Error}
     * @memberof P24
     */
    public async verifyTransaction(verification: Verification): Promise<boolean> {
        try {
            const hashData = {
                sessionId: verification.sessionId,
                orderId: verification.orderId,
                amount: verification.amount,
                currency: verification.currency,
                crc: this.options.crcKey
            }

            const sign = calculateSHA384(JSON.stringify(hashData))

            const verificationData = {
                ...this.baseParameters,
                ...verification,
                sign
            }

            const {data} = await this.client.put(EndpointTransactionVerify, verificationData)
            const result = <SuccessResponse<VerificationData>>data
            return result.data.status === 'success'
        } catch (error: any) {
            if (error.response && error.response.data) {
                const resp = <ErrorResponse<string>>error.response.data
                throw new P24Error(resp.error, resp.code)
            }
            throw new P24Error(`Unknown Error ${error}`, -1)
        }
    }

    /**
     * Verify notification transaction with our CRC Key
     *
     * @param {NotificationRequest} notificationRequest
     * @returns {boolean}
     * @memberof P24
     */
    public verifyNotification(notificationRequest: NotificationRequest): boolean {
        const notificationHash = {
            ...notificationRequest,
            sign: undefined,
            crc: this.options.crcKey
        }
        const sign = calculateSHA384(JSON.stringify(notificationHash))
        return sign === notificationRequest.sign
    }

    /**
     * Handle refund
     *
     * @param {RefundRequest} refundRequest
     * @returns {Promise<RefundResult[]>}
     * @memberof P24
     */
    public async refund(refundRequest: RefundRequest): Promise<RefundResult[]> {
        try {
            const {data} = await this.client.post(EndpointRefund, refundRequest)
            const resp = <SuccessResponse<RefundResult[]>>data
            return resp.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                if (error.response.data.code === 409) {
                    const resp = <ErrorResponse<RefundResult[]>>error.response.data
                    throw new P24Error('Refund Conflict', resp.code, resp.error)
                }
                const resp = <ErrorResponse<string>>error.response.data
                throw new P24Error(resp.error, resp.code)
            }
            throw new P24Error(`Unknown Error ${error}`, -1)
        }
    }

    /**
     * Validates IP with P24 backends
     *
     * @static
     * @param {string} ip - IP Address
     * @returns {boolean} - true on validated ip
     * @memberof P24
     */
    public static isIpValid(ip: string): boolean {
        return validIps.includes(ip)
    }
}
