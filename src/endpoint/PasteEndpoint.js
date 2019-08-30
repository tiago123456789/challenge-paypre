const { check } = require("express-validator");
const PasteService = require("../service/PasteService");
const Endpoint = require("./Endpoint");

class PasteEndpoint extends Endpoint {

    constructor() {
        super();
        this._service = new PasteService();
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.addUser = this.addUser.bind(this);
    }


    async addUser(request, response, next) {
        try {
            const { id, username } = request.params;
            await this._service.addUser(id, username);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    async findAll(request, response, next) {
        try {
            const pastes = await this._service.findAll();
            response.json(pastes);
        } catch(error) {
            next(error);
        }
    }

    async create(request, response, next) {
        try {
            this.isDataInvalid(request, response);
            const newRegister = request.body;
            await this._service.create(newRegister);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    validations() {
        return [
            check("name")
                .isLength({ min: 1 }).withMessage("The field name is required.")
        ];
    }

}

module.exports = PasteEndpoint;