const Category = require('./../models/category');

let cache = {
    _cacheById: {},
    _cacheByName: {},

    getCategoryById(id) {
        return this._cacheById[id];
    },

    getCategoryByName(name) {
        return this._cacheByName[name]
    },

    init() {
        return Category
            .find({})
            .exec()
            .then((categories) => {
                categories.forEach((category) => {
                    category = category.toJSON();
                    this._cacheById[category._id] = category;
                    this._cacheByName[category.name] = category;
                });
            })
    }
};

module.exports = cache;