const getMessageErrorValidation = (error) => {
    error = error.errors;
    const keys = Object.keys(error);
    return keys.map(key => error[key]["message"]);
}

module.exports = (error, request, response, next) => {
    console.log(error);
    switch(error.name) {
        case "UNAUTHORIZATED":
            return response.status(401).json({ msg: error.message });
        case "FORBIDDEN":
            return response.status(403).json({ msg: error.message });
        case "NOT_FOUND":
            return response.status(404).json({ msg: error.message });
        case "LOGIC_NEGOTIATION":
            return response.status(409).json({ msg: error.message });
        case "ValidationError":
            return response.status(422).json({ msg: getMessageErrorValidation(error) })
        default:
            return response.status(500).json({ msg: error.message });
    }
};

