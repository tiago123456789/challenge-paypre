const GithubUserRepository = require("../repository/GithubUserRepository");
const NotFoundException = require("../exception/NotFoundException");
const axios = require("axios");

class GithubUserService {

    constructor(repository = null) {
        this._respository = repository || new GithubUserRepository();
    }

    findAll() {
        return this._respository.findAll();
    }

    findByLogin(login) {
        return this._respository.findByLogin(login);
    }

    async searchByUsername(username) {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            return this._extractDatasResponse(response);
        } catch(error) {
            throw new NotFoundException("Username informated not found.")
        }
    }

    async create(newRegister) {
        const userAlreadyRegister = await this._respository.findByLogin(newRegister["username"]);
    
        if (!userAlreadyRegister) {
            newRegister = await this.searchByUsername(newRegister["username"]);
            const { login, name, html_url, location, bio } = newRegister;
            return this._respository.create({ login, name, html_url, location, bio });
        }

        return null;
    }

    _extractDatasResponse(response) {
        return response.data;
    }
    
}

module.exports = GithubUserService;