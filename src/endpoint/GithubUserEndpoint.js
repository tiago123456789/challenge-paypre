const  { check } = require("express-validator");
const GithubUserService = require("../service/GithubUserService");
const Endpoint = require("./Endpoint");

class GithubUserEndpoint extends Endpoint {

    constructor() {
        super();
        this._service = new GithubUserService();
        this.searchByUsername = this.searchByUsername.bind(this);
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
    }

    async findAll(request, response, next) {
        try {
            const githubUsers = await this._service.findAll();
            response.json(githubUsers);
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

    async searchByUsername(request, response, next) {
        try {
            const username = request.params.username;
            const githubUserDatas = await this._service.searchByUsername(username);
            response.json(githubUserDatas);
        } catch(error) {
            next(error);
        }
    }

    validations() {
        return [
            check("username")
                .isLength({ min: 1 }).withMessage("The field username is required.")
        ];
    }

}

module.exports = GithubUserEndpoint;