const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const urlsService = require('../services/urlsService');

const ShortUrl = require('../../models/ShortUrl');

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
    const full = req.body.fullUrl;

    // Check long url
    if (validUrl.isUri(full)) {
        try {
            let url = await ShortUrl.findOne({ full: full });
            if (url) {
                res.json(url);
            } else {
                // Create short url code
                const short = shortId.generate();

                // Create short url on database
                url = new ShortUrl({
                    full: full,
                    short: short,
                    clicks: 0,
                    date: new Date()
                });

                await url.save()
                //res.json(url);
                res.redirect('/');
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.status(401).json('Invalid full url');
    }
});

// @route   DELETE /api/url/shorten/:shortUrl
// @desc    Delete short URL
router.delete('shorten', async (req, res) => {
    res.json({
        id: 1,
        title: "teste API delete"
    });
});

module.exports = router;