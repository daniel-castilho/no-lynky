const express = require('express');
const router = express.Router();
const urlsService = require('../services/urlsService');

const ShortUrl = require('../../models/ShortUrl');

// @route   GET /
// @desc    Call index page
router.get('/', async (req, res) => {
    res.render('index', { shortUrls: await urlsService.getUrls() });
    //res.json(await urlsService.getUrls());
});

// @route   GET /:shortUrl
// @desc    Redirect to long/original URL
router.get('/:shortUrl', async (req, res) => {
    try {
        const url = await ShortUrl.findOne({ short: req.params.shortUrl});

        if (url) {
            url.clicks++;
            url.save();

            return res.redirect(url.full);
        } else {
            return res.status(404).json('No url found');
        }
    } catch(err) {
        console.log(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;
