const mongoose = require('mongoose');

const ImageModel = require('./models/image');

const categoriesCache = require('./controllers/categories-cache');
const imageController = require('./controllers/image-controller');

const db = mongoose.connect('mongodb://localhost/adb', async () => {
    //as the first step we should initialize the cache for categories
    await categoriesCache.init();
    console.log('category with a name "Cars":')
    console.log(categoriesCache.getCategoryByName('Cars')); //now we can find a category by name

    const someRandomImage = await ImageModel.findOne({}).exec(); //here I find one image to use it's id as a parameter for search
    const imageById = await imageController.getImageById(someRandomImage._id);
    console.log('image by id:');
    console.log(imageById);

    const allImagesWithCars = await imageController.getAllImagesFromCategory('Cars');
    console.log('all images with cars:');
    console.log(allImagesWithCars);

    db.disconnect();

});