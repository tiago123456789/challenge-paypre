const jwt = require("jsonwebtoken");
const SecurityException = require("../exception/SecurityException");
const app = require("../config/App");

class Token {

    constructor() {
        this._secret = process.env.TOKEN_SECRET;
        this._payload = [];
        this._timeExpired = () => (Math.floor(Date.now() / 1000) + (15 * 60));
    }

    withTimeExpired(timeExpired) {
        this._timeExpired = timeExpired
        return this;
    }

    withPayload(key, value) {
        this._payload[key] = value;
        return this;
    }

    getValueInPayload(key, token) {
        token = token.replace(app.PARAM_PREFIX_TOKEN, '');
        const headerPayloadSignature = token.split(".");
        let payload = headerPayloadSignature[1];
        const buffer = new Buffer(payload, "base64");
        payload = buffer.toString("utf-8");
        payload = JSON.parse(payload);
        return payload[key];
    }

    async build() {
        return jwt.sign(
            {...this._payload, exp: this._timeExpired() },
            this._secret
        );
    }

    async isValid(token) {
        try {
            jwt.verify(token, this._secret);
        } catch(error) {
            throw new SecurityException("FORBIDDEN", "Token invalid!");
        }
    }
}

module.exports = Token;