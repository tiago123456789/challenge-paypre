const UserService = require("../../src/service/UserService");
const bcrypt = require("bcryptjs");

describe("Suit test UserService", () => {
    const userFake = {
        "email": "test@gmail.com",
        "password": "123654789"
    };

    afterEach(() => {
        eventEmitter.emit("database-close-connection");
    });

    it("Should create new user", async () => {
        const repositoryFake = {
            findByEmail: sinon.stub(),
            create: sinon.spy()
        };

        repositoryFake.findByEmail.withArgs(userFake.email).returns(null);

        const userService = new UserService(repositoryFake);
        await userService.create(userFake);
        chai.assert(repositoryFake.create.calledOnce);
    });

    it("Should trigger exception to the try create new user with email used", async () => {
        const repositoryFake = {
            findByEmail: sinon.stub(),
            create: sinon.spy()
        };

        repositoryFake.findByEmail.withArgs(userFake.email).returns(userFake);

        try {
            const userService = new UserService(repositoryFake);
            await userService.create(userFake);
        } catch (error) {
            assert.equal("LOGIC_NEGOTIATION", error.name);
        }
    });

    it("Should trigger exception to the try call authenticate method without passed parameter necessary",
        async () => {
            try {
                const userService = new UserService();
                await userService.authenticate();
            } catch (error) {
                assert.equal("UNAUTHORIZATED", error.name);
            }
        });

    it("Should trigger exception to the try authenticate credentials invalids",
        async () => {
            const saltRounds = 10;
            userFake["password"] = await bcrypt.hash(userFake.password, saltRounds);

            const repositoryFake = {
                findByEmail: sinon.stub(),
            };

            repositoryFake.findByEmail.withArgs(userFake.email).returns(userFake);

            try {
                const userService = new UserService(repositoryFake);
                await userService.authenticate({ ...userFake, password: "1111111" });
            } catch (error) {
                assert.equal("UNAUTHORIZATED", error.name);
            }
        });

    it("Should trigger exception to the try authenticate credentials invalids",
        async () => {
            const saltRounds = 10;
            const userFake = {
                "email": "test@gmail.com",
                "password": "123654789"
            };
            userFake["password"] = await bcrypt.hash(userFake.password, saltRounds);

            const repositoryFake = {
                findByEmail: sinon.stub(),
            };

            repositoryFake.findByEmail.withArgs(userFake.email).returns(userFake);

            const userService = new UserService(repositoryFake);
            const accessToken = await userService.authenticate({ ...userFake, "password": "123654789" });
            assert(accessToken != null)
        });

});