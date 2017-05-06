const Image = require('./../models/image');
const categoriesCache = require('./categories-cache');

function getImageById(id) {
    return Image.findById(id)
        .exec()
        .then((image) => {
            image = image.toJSON();
            //need to map image.categories from ObjectIds to Objects

            image.categories = image.categories.map((id) => {
                return categoriesCache.getCategoryById(id);
            });

            return image;
        });
}

function getAllImagesFromCategory(categoryName) {
    return Image.find({category: categoriesCache.get})
        .exec()
        .then((images) => {
            images = images.map((image) => {
                image = image.toJSON();
                image.categories = image.categories.map((id) => {
                    return categoriesCache.getCategoryById(id);
                });

                return image;
            });

            return images;
        });
}

module.exports = {
    getImageById,
    getAllImagesFromCategory
};