const database = require('../infra/db');
const ShortUrl = require('../../models/ShortUrl');

exports.getUrls = () => {
    return ShortUrl.find();
}