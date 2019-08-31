const CONSTANTES = require("../../src/config/App");
const collection = require("../../src/collections/User");
const database = require("../helpers/Database");

describe("Suit integration test auth", () => {
    const user = {
        "email": "teste@gmail.com",
        "password": "teste12",
        "cpf": "12121212121",
        "role": "ADMIN"
    };

    beforeEach(async () => {
        await database(collection).clean();
    });

    it("Should return status 422 because not informated datas necessary", function (done) {
        request
            .post("/auth/login")
            .send({})
            .expect(422)
            .end(done);
    });

    it("Should return status 200 to the execute authentication with success", function (done) {
        collection.create(user).then(() => {
            request
            .post("/auth/login")
            .send({ email: user.email, password: user.password })
            .expect(200)
            .end(done);
        });
    });
});