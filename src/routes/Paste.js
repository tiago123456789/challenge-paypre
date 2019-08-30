const express = require("express");
const PasteEndpoint = require("../endpoint/PasteEndpoint");

const pasteEndpoint = new PasteEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/", pasteEndpoint.findAll);
    router.post("/:id/users/:username", pasteEndpoint.addUser);
    router.post("/", pasteEndpoint.validations(), pasteEndpoint.create);
    
    return router;
}