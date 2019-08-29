const express = require("express");
const AuthEndpoint = require("../endpoint/AuthEndpoint");

const authEndpoint = new AuthEndpoint();
const router = express.Router();

module.exports = () => {

    router.post("/login", authEndpoint.validations(), authEndpoint.autenticate);
    
    return router;
}