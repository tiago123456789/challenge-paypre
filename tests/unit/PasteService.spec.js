const PasteService = require("../../src/service/PasteService");
const GithubUserService = require("../../src/service/GithubUserService");

describe("Suit test PasteService", () => {
    const pasteFake = {
        _id: 1,
        name: "Test"
    };
    const idFake = 1;
    const id = "5d69e5d9a84cce78d7d52dcc";
    const idUser = "5d69e5d9a84cce78d7d52dcc";
    const tag = "test";

    it("Should return 3 itens to the call method findAll", async () => {
        const repositoryFake = {
            "findAll": sinon.stub()
        };

        repositoryFake.findAll.returns([pasteFake, pasteFake, pasteFake]);

        const pasteService = new PasteService(repositoryFake);
        pasteReturned = await pasteService.findAll();
        const quantityExpected = 3;
        const quantityReturned = pasteReturned.length;
        expect(quantityExpected).to.be.equal(quantityReturned);
    });

    it("Should trigger exception to the find by id not exist", async () => {
        const repositoryFake = {
            "findById": sinon.stub()
        };

        repositoryFake.findById.withArgs(idFake).returns(null);
        try {
            const pasteService = new PasteService(repositoryFake);
            pasteReturned = await pasteService.findById(idFake);
        } catch (error) {
            expect("NOT_FOUND").to.equal(error.name);
        }
    });

    it("Should return register to the find by id", async () => {
        const repositoryFake = {
            "findById": sinon.stub()
        };

        repositoryFake.findById.withArgs(idFake).returns(pasteFake);
        const pasteService = new PasteService(repositoryFake);
        pasteReturned = await pasteService.findById(idFake);
        expect(pasteFake.name).to.equal(pasteFake.name);
        expect(pasteFake._id).to.equal(pasteFake._id);
    });


    it("Should trigger exception to the delete register not exist", async () => {
        const repositoryFake = {
            "findById": sinon.stub()
        };

        repositoryFake.findById.withArgs(idFake).returns(null);
        try {
            const pasteService = new PasteService(repositoryFake);
            pasteReturned = await pasteService.remove(idFake);
        } catch (error) {
            expect("NOT_FOUND").to.equal(error.name);
        }
    });


    it("Should deleter register", async () => {
        const repositoryFake = {
            "findById": sinon.stub(),
            "remove": sinon.spy()
        };

        repositoryFake.findById.withArgs(idFake).returns(pasteFake);
        const pasteService = new PasteService(repositoryFake);
        await pasteService.remove(idFake);
        assert(repositoryFake.remove.calledOnce);

    });


    it("Should trigger exception to the update register not exist", async () => {
        const repositoryFake = {
            "findById": sinon.stub()
        };

        repositoryFake.findById.withArgs(idFake).returns(null);
        try {
            const pasteService = new PasteService(repositoryFake);
            pasteReturned = await pasteService.update(idFake, pasteFake);
        } catch (error) {
            expect("NOT_FOUND").to.equal(error.name);
        }
    });

    it("Should deleter register", async () => {
        const repositoryFake = {
            "findById": sinon.stub(),
            "update": sinon.spy()
        };

        repositoryFake.findById.withArgs(idFake).returns(pasteFake);
        const pasteService = new PasteService(repositoryFake);
        await pasteService.update(idFake, pasteFake);
        assert(repositoryFake.update.calledOnce);

    });


    it("Should trigger exception to the create register with name used per other", async () => {
        const repositoryFake = {
            "findByName": sinon.stub()
        };

        repositoryFake.findByName.withArgs(pasteFake.name).returns(pasteFake);
        try {
            const pasteService = new PasteService(repositoryFake);
            await pasteService.create(pasteFake);
        } catch (error) {
            expect("LOGIC_NEGOTIATION").to.equal(error.name);
        }
    });

    it("Should create register", async () => {
        const repositoryFake = {
            "findByName": sinon.stub(),
            "create": sinon.spy()
        };

        repositoryFake.findByName.withArgs(pasteFake.name).returns(null);
        const pasteService = new PasteService(repositoryFake);
        await pasteService.create(pasteFake);
        assert(repositoryFake.create.calledOnce);
    });

    it("Should add tag a github user in paste", async () => {
        const repositoryFake = {
            "isCheckTagAddedToUser": sinon.stub(),
            "addTag": sinon.spy()
        };
        repositoryFake.isCheckTagAddedToUser.withArgs(id, idUser, tag).returns(null);
        const pasteService = new PasteService(repositoryFake);
        await pasteService.addTag(id, idUser, tag);
        assert(repositoryFake.addTag.calledOnce);
    });

    it("Should trigger exception to the try add tag a github user in paste already have tag added",
        async () => {
            const repositoryFake = {
                "isCheckTagAddedToUser": sinon.stub(),
                "addTag": sinon.spy()
            };

            repositoryFake.isCheckTagAddedToUser.withArgs(id, idUser, tag).returns(pasteFake);
            try {
                const pasteService = new PasteService(repositoryFake);
                await pasteService.addTag(id, idUser, tag);
            } catch (error) {
                expect("LOGIC_NEGOTIATION").to.equal(error.name);
            }
        });

});