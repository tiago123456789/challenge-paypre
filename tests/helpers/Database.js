module.exports = (collection) => {
    return { 
        clean() {
            return collection.remove({});
        }
    }
}