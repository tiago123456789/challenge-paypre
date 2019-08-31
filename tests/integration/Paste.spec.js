const CONSTANTES = require("../../src/config/App");
const collection = require("../../src/collections/Paste");

describe("Suit integration test github users", () => {
    const idInvalid = "5d69e5d9a84cce78d7d52dcc";
    const pasteFake = {
        "name": "Paste fake"
    };

    beforeEach(async () => {
        await database(collection).clean();
    });

    it("Should return status 200 to the return all paste", function (done) {
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
            request
                .get("/pastes")
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .expect(200)
                .end(done);
        });

    });

    it("Should return status 404 to the update by id not exist", function (done) {
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
            request
                .get(`/pastes/${idInvalid}`)
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .expect(404)
                .end(done);
        });
    });

    it("Should return status 200 to the update by id with success", function (done) {
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
            collection.create(pasteFake).then(pasteCreated => {
                request
                    .put(`/pastes/${pasteCreated._id}`)
                    .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                    .send({})
                    .expect(204)
                    .end(done);
            });
        });
    });

    it("Should return status 404 to the remove by id not exist", function (done) {
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
            request
                .delete(`/pastes/${idInvalid}`)
                .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                .expect(404)
                .end(done);
        });
    });

    it("Should return status 200 to the delete by id with success", function (done) {
       
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
            collection.create(pasteFake).then(pasteCreated => {
                request
                    .delete(`/pastes/${pasteCreated._id}`)
                    .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                    .expect(204)
                    .end(done);
            });
        });
    });

    it("Should return status 200 to the delete by id with success", function (done) {
       
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
                request
                    .post(`/pastes`)
                    .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                    .send(pasteFake)
                    .expect(201)
                    .end(done);
        });
    });

    it("Should return status 200 to the delete by id with success", function (done) {
       
        authHelper.getAccessTokenWithRoleCOMUM().then(accessToken => {
            collection.create(pasteFake).then(pasteCreated => {
                request
                    .post(`/pastes`)
                    .set(CONSTANTES.PARAM_AUTH_HEADER, accessToken)
                    .send(pasteFake)
                    .expect(409)
                    .end(done);
            });
        });
    });

});