const UserService = require("../../src/service/UserService");
const collection = require("../../src/collections/User");
const database = require("./Database");
const CONSTANTES = require("../../src/config/App");
const userService = new UserService();

const user = {
    "email": "teste@gmail.com",
    "password": "teste12",
    "cpf": "12121212121",
    "role": "ADMIN"
};

module.exports = {

    async _getAccessToken() {
        await userService.create(user);
        const accessToken = await userService.authenticate(user);
        return CONSTANTES.PARAM_PREFIX_TOKEN + accessToken;
    },

    async getAccessTokenWithRoleADMIN() {
        await database(collection).clean();
        user.role = "ADMIN";
        return this._getAccessToken();
    },
    
    async getAccessTokenWithRoleCOMUM() { 
        await database(collection).clean();
        user.role = "COMUM";
        return this._getAccessToken();
    }

}