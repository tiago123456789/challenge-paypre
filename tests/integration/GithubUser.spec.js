const CONSTANTES = require("../../src/config/App");
const collection = require("../../src/collections/GithubUser");

describe("Suit integration test github users", () => {

    beforeEach(async () => {
        await database(collection).clean();
    });

    it("Should return status 200", function (done) {
        authHelper.getAccessTokenWithRoleADMIN().then(accessToken => {
            request
                .get("/github-users/suissa")
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .expect(200)
                .end(done);
        });

    });

    it("Should return status 404 to the try search with username not found", function (done) {
        authHelper.getAccessTokenWithRoleADMIN().then(accessToken => {
            request
                .get("/github-users/1524521525asdfasd")
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .expect(404)
                .end(done);
        });

    });

    it("Should return status 422 to the try register github user without datas necessary", function (done) {
        authHelper.getAccessTokenWithRoleADMIN().then(accessToken => {
            request
                .post("/github-users")
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .send({})
                .expect(422)
                .end(done);
        });

    });

    it("Should return status 422 to the try register github user without datas necessary", function (done) {
        authHelper.getAccessTokenWithRoleADMIN().then(accessToken => {
            request
                .post("/github-users")
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .send({ username: "suissa" })
                .expect(201)
                .end(done);
        });

    });

    it("Should return status 422 to the try register github user without datas necessary", function (done) {
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
            request
                .get("/github-users")
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .expect(200)
                .end(done);
        });

    });


    // it("Should return status 200 to the execute authentication with success", function (done) {
    //     collection.create(user).then(() => {
    //         request
    //         .post("/auth/login")
    //         .send({ email: user.email, password: user.password })
    //         .expect(200)
    //         .end(done);
    //     });
    // });
});