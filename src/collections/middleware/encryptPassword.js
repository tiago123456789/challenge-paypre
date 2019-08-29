const bcrypt = require("bcryptjs");

module.exports = async function (next) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
}