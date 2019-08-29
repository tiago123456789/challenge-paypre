const Repository = require("./Repository");
const githubUserModel = require("../collections/GithubUser");

class GithubUserRepository extends Repository {

    constructor() {
        super(githubUserModel);
    }

    findByLogin(login) {
        return this.getModel().findOne({ login: login });
    }
}

module.exports = GithubUserRepository;