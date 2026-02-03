/**
 * Error from Przelewy24
 *
 * @export
 * @class P24Error
 * @extends {Error}
 */
export class P24Error extends Error {
    public code: number;
    public extra?: unknown;

    constructor(error: string, code: number, extra?: unknown) {
        super(`error = ${error}, code = ${code}, extra = ${extra}, extraDecoded = ${JSON.stringify(extra)}`);
        this.code = code;
        this.extra = extra;
        Object.setPrototypeOf(this, P24Error.prototype);
    }
}
