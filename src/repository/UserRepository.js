const Repository = require("./Repository");
const userModel = require("../collections/User");

class UserRepository extends Repository {

    constructor() {
        super(userModel);
    }

    findByEmail(email) {
        return this.getModel().findOne({ "email": email });
    }
}

module.exports = UserRepository;