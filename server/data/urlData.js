const database = require('../infra/db');
const ShortUrl = require('../../models/ShortUrl');

exports.getUrls = () => {
    return ShortUrl.find();
}

exports.getUrl = (full) => {
    return ShortUrl.findOne({ full });
}

exports.getShortUrl = (short) => {
    return ShortUrl.findOne({ short });
}

exports.saveUrl = async ({ full, short, clicks }) => {
    // Create short url on database
    url = new ShortUrl({
        full: full,
        short: short,
        clicks: clicks,
        date: new Date()
    });

    await url.save();
    return url;
    //res.redirect('/');
}

exports.deleteUrl = async (short) => {

    return await ShortUrl.deleteOne({ short: short });
}

exports.updateClick = async (short, clicks) => {
    const filter = { short: short };
    const update = { clicks: clicks };
    const url = await ShortUrl.findOneAndUpdate(filter, update, {
        new: true
    });
    return url;
}
