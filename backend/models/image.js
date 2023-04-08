const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    albumName: String,
    filePath: [{
      type: String,
      required: true,
    }]
}, {timestamps: true});

const Image = mongoose.model('Image', albumSchema);
module.exports = Image;
