module.exports = (collection) => {
    return { 
        clean() {
            return collection.deleteMany({});
        }
    }
}