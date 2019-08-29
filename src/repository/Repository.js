class Repository {

    constructor(model) {
        this._model = model;
    }

    create(newRegister) {
        return this._model.create(newRegister);
    }

    findAll() {
        return this._model.find({});
    }

    findById(id) {
        return this._model.findById(id);
    }

    remove(id) {
        return this._model.deleteOne({ _id: id });
    }

    update(id, datasModified) {
        return this._model.updateOne({ _id: id }, { $set: datasModified });
    }

    getModel() {
        return this._model;
    }
}

module.exports = Repository;