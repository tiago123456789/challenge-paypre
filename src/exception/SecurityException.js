function SecurityException(name, message) {
    this.name = name || "UNAUTHORIZATED";
    this.message = message;
}

SecurityException.prototype = Error.prototype;

module.exports = SecurityException;