const userRoutes = require("./User");
const pasteRoutes = require("./Paste");
const githubUserRoutes = require("./GithubUser");
const authRoutes = require("./Auth");
const handlerException = require("../middleware/HandlerExceptionMiddleware");

module.exports = (app) => {

    app.use("/users", userRoutes());
    app.use("/pastes", pasteRoutes());
    app.use("/github-users", githubUserRoutes());    
    app.use("/auth", authRoutes());

    // Handler exception trigger to the application.
    app.use(handlerException);
}