const app = require("./config/Server");
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running in: http:localhost:${PORT}`));
