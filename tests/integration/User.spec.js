const CONSTANTES = require("../../src/config/App");
const collection = require("../../src/collections/User");

describe("Suit integration test user", () => {
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
            .post("/users")
            .send({})
            .expect(422)
            .end(done);
    });

    it("Should return status 201 to the created user success", function (done) {
        request
            .post("/users")
            .send(user)
            .expect(201)
            .end(done);
    });

    it("Should return status 409 to the created user with email already used", function (done) {
        collection.create(user).then(() => {
            request
                .post("/users")
                .send(user)
                .expect(409)
                .end(done);
        });

    })
});