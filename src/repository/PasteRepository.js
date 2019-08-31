const mongoose = require("mongoose");
const Repository = require("./Repository");
const pasteModel = require("../collections/Paste");

class PasteRepository extends Repository {

    constructor() {
        super(pasteModel);
    }

    findByName(name) {
        return this.getModel().findOne({ name: name });
    }

    findByIdAndIdUser(id, idUser) {
        return this.getModel().findOne({
            _id: id, 
            'github_users': { $elemMatch: { 'user._id': idUser } }
        });
    }

    async isCheckTagAddedToUser(id, idUser, tag) {
        const register = await this.getModel().findOne({
            _id: id, 
            'github_users': { 
                $elemMatch: { 'user._id': mongoose.Types.ObjectId(idUser), tags: { $in: [ tag ] }  }
            } 
        });

        return register;
    }

    addTag(id, idUser, tag) {
        return this.getModel().update({
            _id: id, 
            'github_users': {
                $elemMatch: { 'user._id': mongoose.Types.ObjectId(idUser) }
            }
        }, { $push: { "github_users.$.tags": tag } });
    }
}

module.exports = PasteRepository;