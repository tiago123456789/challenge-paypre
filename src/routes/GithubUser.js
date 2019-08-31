const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const GithubUserEndpoint = require("../endpoint/GithubUserEndpoint");

const githubUserEndpoint = new GithubUserEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/:username", authMiddleware.hasPermission("ADMIN"), githubUserEndpoint.searchByUsername);
    router.get("/", authMiddleware.hasPermission("COMUN"), githubUserEndpoint.findAll);
    router.post("/", 
        authMiddleware.hasPermission("ADMIN"),
        githubUserEndpoint.validations(),
        githubUserEndpoint.create
    );
    
    return router;
}