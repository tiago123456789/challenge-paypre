const GithubUserService = require("../../src/service/GithubUserService");

describe("Suit test GithubUserService", () => {
    const githubUserFake = {
        login: "test",
        name: "Test",
        bion: "Test only",
        location: "Test - T",
        html_url: "www.github.com.br/users/test"
    };

    afterEach(() => {
        eventEmitter.emit("database-close-connection");
    });
    
    it("Should return 3 itens to the call method findAll", async () => {
        const repositoryFake = {
            "findAll": sinon.stub()
        };

        repositoryFake.findAll.returns([ githubUserFake, githubUserFake, githubUserFake ]);

        const githubUserService = new GithubUserService(repositoryFake);
        githubUserReturned = await githubUserService.findAll();
        const quantityExpected = 3;
        const quantityReturned = githubUserReturned.length;
        expect(quantityExpected).to.be.equal(quantityReturned);
    });

    
});