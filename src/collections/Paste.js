const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pasteSchema = new Schema({
    name: {
        type: String, required: true
    },
    github_users: [
        {
            user: {
                _id: Schema.Types.ObjectId,
                login: String
            },
            tags: []
        }
    ]
});

module.exports = mongoose.model("paste", pasteSchema);