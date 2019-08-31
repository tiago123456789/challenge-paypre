const { check } = require("express-validator");
const authMiddleware = require("../middleware/AuthMiddleware");
const express = require("express");
const PasteEndpoint = require("../endpoint/PasteEndpoint");

const pasteEndpoint = new PasteEndpoint();
const router = express.Router();

module.exports = () => {

    router.get("/", authMiddleware.hasPermission("COMUN"), pasteEndpoint.findAll);
    router.put("/:id", authMiddleware.hasPermission("COMUN"), pasteEndpoint.update);
    router.delete("/:id", authMiddleware.hasPermission("COMUN"), pasteEndpoint.remove);

    router.post("/:id/users", authMiddleware.hasPermission("COMUN"), [ 
        check("username").isLength({ min: 1 }).withMessage("The field username is required.")
    ], pasteEndpoint.addUser);

    router.post("/:id/users/:username/tags", 
        authMiddleware.hasPermission("COMUN"), [ 
        check("tag").isLength({ min: 1 }).withMessage("The field tag is required.")
    ], pasteEndpoint.addTag);

    router.post("/", 
        authMiddleware.hasPermission("COMUN"), 
        pasteEndpoint.validations(),
        pasteEndpoint.create
    );
    
    return router;
}