const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const imageSchema = new Schema({
    title: String,
    categories: [Schema.ObjectId],
    description: String,
    path: String,
    createdAt: {type: Date, default:Date.now},
    isDeleted: {type: Boolean, default: false}
});

module.exports = mongoose.model('Image', imageSchema);