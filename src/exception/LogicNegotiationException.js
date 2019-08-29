function LogicNegotiationException(message) {
    this.name = "LOGIC_NEGOTIATION";
    this.message = message;
}

LogicNegotiationException.prototype = Error.prototype;

module.exports = LogicNegotiationException;