const dotenv = require("dotenv");

const loaderEnvironmentVariables = () => {
    const pathFileDotenv = process.env.NODE_ENV == "test" ? ".env-test" : ".env";
    dotenv.config({ path: pathFileDotenv });
}

loaderEnvironmentVariables();

