const express = require("express");
const GithubUserEndpoint = require("../endpoint/GithubUserEndpoint");

const githubUserEndpoint = new GithubUserEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/:username", githubUserEndpoint.searchByUsername);
    router.get("/", githubUserEndpoint.findAll);
    router.post("/", githubUserEndpoint.validations(), githubUserEndpoint.create);
    
    return router;
}