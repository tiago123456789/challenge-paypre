function NotFoundException(message) {
    this.name = "NOT_FOUND";
    this.message = message;
}

NotFoundException.prototype = Error.prototype;

module.exports = NotFoundException;