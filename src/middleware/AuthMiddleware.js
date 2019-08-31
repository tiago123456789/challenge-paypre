const Token = require("../lib/Token");
const app = require("../config/App");
const SecurityException = require("../exception/SecurityException");

const token = new Token();

module.exports = {
    hasPermission(permissionNecessary) {
        return async function(request, response, next) {
            try {
                let accessToken = request.header(app.PARAM_AUTH_HEADER);

                if (!accessToken) {
                    throw new SecurityException(null, "Necessary informated acessToken!");
                }


                const isValidAccessToken = /Bearer /i.test(accessToken);
                if (!isValidAccessToken) {
                    throw new SecurityException(null, "Token invalid")
                }

                accessToken = accessToken.replace(app.PARAM_PREFIX_TOKEN, "");
                await token.isValid(accessToken);
                const isHasPermissionNecessary = token.getValueInPayload("role", accessToken) == permissionNecessary;
                
                if (isHasPermissionNecessary) {
                    next();
                } else {
                    throw new SecurityException("FORBIDDEN", "You not have permission necessary to execute process.");
                }
            } catch (error) {
                next(error);
            }
        }
    }
}