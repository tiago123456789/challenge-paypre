const  { check } = require("express-validator");
const regex = require("../lib/Regex");
const UserService = require("../service/UserService");
const Endpoint = require("./Endpoint");

class UserEndpoint extends Endpoint {

    constructor() {
        super();
        this._service = new UserService();
        this.create = this.create.bind(this);
        this.autenticate = this.autenticate.bind(this);
    }

    async autenticate(request, response, next) {
        try {
            const credentials = request.body;
            const accessToken = await this._service.authenticate(credentials);
            response.json({ accessToken });
        } catch(error) {
            next(error);
        }
    }

    async create(request, response, next) {
        try {
            this.isDataInvalid(request, response);
            const newUser = request.body;
            await this._service.create(newUser);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    validations() {
        return [
            check("email").isLength({ min: 1 })
            .withMessage("The field email is required."),

            check("email").matches(regex.EMAIL)
            .withMessage("Email is invalid."),            

            check("password").isLength({ min: 6 })
            .withMessage("The field password must at least 6 characters."),
            
            check("cpf").isLength({ min: 11 })
            .withMessage("The field cpf must at least 11 required."),

            check("role").isLength({ min: 1 })
            .withMessage("The field role is required. Values valids: COMUM OR ADMIN")
        ];
    }

}

module.exports = UserEndpoint;