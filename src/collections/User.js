const encryptPassword = require("./middleware/encryptPassword");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    cpf: {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },
    password: {
        type: String, require: true
    },
    role: {
        type: String, require: true,
        set: function(value) {
            return value.toUpperCase();
        } 
    }
});

userSchema.pre("save", encryptPassword);

module.exports = mongoose.model("user", userSchema);