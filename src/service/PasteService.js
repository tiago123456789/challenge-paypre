const PasteRepository = require("../repository/PasteRepository");
const GithubUserService = require("../service/GithubUserService");
const LogicNegotiationException = require("../exception/LogicNegotiationException");
const NotFoundException = require("../exception/NotFoundException");


class PasteService {

    constructor() {
        this._repository = new PasteRepository();
        this._githubUserService = new GithubUserService();
    }

    async findById(id) {
        const paste = await this._repository.findById(id);
        if (!paste) {
            throw new NotFoundException("Paste not found");
        }
        return paste;
    }

    async addUser(id, login) {
        await this.findById(id);
        let githubUser = await this._githubUserService.findByLogin(login);
        if (!githubUser) {
            throw new NotFoundException("Github user not was register.")
        }

        const userAlreadyAddedPaste = await this._repository.findByIdAndIdUser(id, githubUser._id);
        if (userAlreadyAddedPaste) {
            throw new LogicNegotiationException("User github already was added.");
        } 
        const paste = await this.findById(id);
        paste.github_users.push({
            "user": { _id: githubUser._id, login: githubUser.login } 
            , tags: []
        });
        paste.save();
    }

    async addTag(id, idUser, tag) {
        const tagAlreadyAdded = await this._repository.isCheckTagAddedToUser(id, idUser, tag);
        if (tagAlreadyAdded) {
            throw new LogicNegotiationException("Tag already was added to user.");
        }
        return this._repository.addTag(id, idUser, tag);
    }

    async create(newRegister) {
        const paste = await this._repository.findByName(newRegister["name"]);
        if (paste) {
            throw new LogicNegotiationException("Paste with name already exist.");
        }
        return this._repository.create(newRegister);
    }

    findAll() {
        return this._repository.findAll();
    }

    async findById(id) {
        const paste = await this._repository.findById(id);
        if (!paste) {
            throw new NotFoundException("Paste not found.");
        }
        return paste;
    }

    async remove(id) {
        await this.findById(id);
        return this._repository.remove(id);
    }

    async update(id, datasModified) {
        await this.findById(id);
        return this._repository.update(id, datasModified);
    }


}

module.exports = PasteService;