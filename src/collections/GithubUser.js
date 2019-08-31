const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const githubUserSchema = new Schema({
    login: String,
    name: String,
    bion: String,
    location: String,
    html_url: String
});

module.exports = mongoose.model("github_user", githubUserSchema);