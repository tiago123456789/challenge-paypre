const { validationResult } = require('express-validator');

class Endpoint {

    constructor() {
        this.validations = this.validations.bind(this);
        this.isDataInvalid = this.isDataInvalid.bind(this);
    }

    validations() {
        return [];
    }

    isDataInvalid(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(error => error.msg);
            return response.status(422).json({ messages });
        }
    }
}

module.exports = Endpoint;