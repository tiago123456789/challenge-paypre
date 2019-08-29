const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.URL_DB_CONNECTION, { useNewUrlParser: true },
    (error) => {
        if (error) console.log(error);
        else console.log("Mongodb conneted success.")
    }
);

module.exports = mongoose;