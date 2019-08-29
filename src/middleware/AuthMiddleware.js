const Token = require("../lib/Token");
const app = require("../config/App");
const SecurityException = require("../exception/SecurityException");

const token = new Token();

module.exports = {

    async hasPermission(request, response, next) {
        try {
            let accessToken = request.header(app.PARAM_AUTH_HEADER);

            if (!accessToken) {
                throw new SecurityException(null, "Necessary informated acessToken!");
            }

            const isValidAccessToken = app.PARAM_PREFIX_TOKEN.test(accessToken);
            if(!isValidAccessToken) {
                throw new SecurityException(null, "Token invalid")
            }
            
            accessToken = accessToken.replace(app.PARAM_PREFIX_TOKEN, "");
            await token.isValid(accessToken);

            next();
        } catch (error) {
            next(error);
        }
    }
}