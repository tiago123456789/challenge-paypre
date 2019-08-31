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
        this.addTag = this.addTag.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async addTag(request, response, next) {
        try {
            this.isDataInvalid(request, response);
            const { id, username } = request.params;
            const tag = request.body.tag;
            await this._service.addTag(id, username, tag);
            response.sendStatus(201);
        } catch(error) {
            next(error);
        }
    }

    async addUser(request, response, next) {
        try {
            this.isDataInvalid(request, response);
            const id = request.params.id;
            const username = request.body.username;
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

    async remove(request, response, next) {
        try {
            const id = request.params.id;
            await this._service.remove(id);
            response.sendStatus(204);
        } catch(error) {
            next(error);
        }
    }

    async update(request, response, next) {
        try {
            const id = request.params.id;
            const datasModified = request.body;
            await this._service.update(id, datasModified);
            response.sendStatus(204);
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