const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const categorySchema = new Schema({
    name: String,
    createdAt: {type:Date, default: Date.now},
    isDeleted: {type: Boolean, default: false}
});

module.exports = mongoose.model('Category', categorySchema);