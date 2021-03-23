const urlData = require('../data/urlData');
const validUrl = require('valid-url');
const shortId = require('shortid');

exports.getUrls = () => {
    return urlData.getUrls();
}

exports.getUrl = async (full) => {
    const url = await urlData.getUrl(full);
    if (!url) throw new Error('Url not found');
    return url;
}

exports.getShortUrl = async (short) => {
    const url = await urlData.getShortUrl({ short });
    if (!url) throw new Error('Url not found');
    return url;
}

exports.saveUrl = async (full) => {
    // Check long url
    if (validUrl.isUri(full)) {
        const existingUrl = await urlData.getUrl(full);

        if (existingUrl) throw new Error('Url already exists');

        // Create short url code
        const short = shortId.generate();
        const clicks = 0;
        return urlData.saveUrl({ full, short, clicks });
    } else {
        return res.status(401).json('Invalid full url');
    }
}

exports.deleteUrl = async (short) => {
    const existingUrl = await urlData.getShortUrl({ short });
    if (!existingUrl) throw new Error('No url found');
    await urlData.deleteUrl(existingUrl.short);
    return res.status(204).end();
}

exports.updateClick = async (short) => {
    const existingUrl = await urlData.getShortUrl(short);
    if (!existingUrl) throw new Error('No url found');
    existingUrl.clicks++;
    return urlData.updateClick(short, existingUrl.clicks);
}