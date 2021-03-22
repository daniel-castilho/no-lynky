const mongoose = require('mongoose');
const shortid = require('shortid');

const ShortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
