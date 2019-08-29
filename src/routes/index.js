const userRoutes = require("./User");
const authRoutes = require("./Auth");
const handlerException = require("../middleware/HandlerExceptionMiddleware");

module.exports = (app) => {

    app.use("/users", userRoutes());
    app.use("/auth", authRoutes());

    // Handler exception trigger to the application.
    app.use(handlerException);
}