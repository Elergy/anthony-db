const mongoose = require('mongoose');

const Image = require('./models/image');
const Category = require('./models/category');

function createCategories() {
    return Promise.all([
        'Cars',
        'Girls',
        'Nature',
        'Cities'
    ].map((name) => {
        const category = new Category();
        category.name = name;

        return category.save();
    }));
}

async function createImages() {
    const carsCollectionId = (await Category.findOne({name: 'Cars'}).exec())._id;
    const girlsCollectionId = (await Category.findOne({name: 'Girls'}).exec())._id;
    const natureCollectionId = (await Category.findOne({name: 'Nature'}).exec())._id;

    const carImage = new Image();
    carImage.title = 'Photo of a car';
    carImage.categories = [carsCollectionId];
    await carImage.save();

    const girlAndCarImage = new Image();
    girlAndCarImage.title = 'a girl in front of a car';
    girlAndCarImage.categories = [girlsCollectionId, carsCollectionId];
    await girlAndCarImage.save();

    const waterfall = new Image();
    waterfall.title = 'Photo of a waterfall';
    waterfall.categories = [natureCollectionId];
    await waterfall.save();
}


const db = mongoose.connect('mongodb://localhost/adb', async () => {
    await createCategories();
    await createImages();

    db.disconnect();
});