const { check } = require("express-validator");

const express = require("express");
const PasteEndpoint = require("../endpoint/PasteEndpoint");

const pasteEndpoint = new PasteEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/", pasteEndpoint.findAll);
    router.put("/:id", pasteEndpoint.update);
    router.delete("/:id", pasteEndpoint.remove);

    router.post("/:id/users",  [ 
        check("username").isLength({ min: 1 }).withMessage("The field username is required.")
    ], pasteEndpoint.addUser);

    router.post("/:id/users/:username/tags", [ 
        check("tag").isLength({ min: 1 }).withMessage("The field tag is required.")
    ], pasteEndpoint.addTag);

    router.post("/", pasteEndpoint.validations(), pasteEndpoint.create);
    
    return router;
}