const e = require('express');
const express = require('express');
const router = express.Router();
const urlsService = require('../services/urlService');

// @route   GET /url
// @desc    Get all urls
router.get('/url', async (req, res) => {
    try {
        res.json(await urlsService.getUrls());
    } catch (err) {
        if (e.message === 'No url found') {
            res.status(404).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    }
});

// @route   GET /url/:shortUrl
// @desc    Given short url and return original/full url
router.get('/url/:shortUrl', async (req, res) => {
    try {
        console.log(req.params.shortUrl);
        const url = await ShortUrl.findOne({ short: req.params.shortUrl });

        if (url) {
            url.clicks++;
            url.save();

            return res.redirect(url.full);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Server error');
    }
});

// @route   POST /api/url
// @desc    Create short URL
router.post('/url', async (req, res) => {
    const full = req.body.fullUrl;

    try {
        const newUrl = await urlsService.saveUrl(full);
        res.status(201).json(newUrl);
    } catch (err) {
        if (e.message === 'Url already exists') {
            res.status(409).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    }
});

// @route   DELETE /api/url/:shortUrl
// @desc    Delete short URL
router.delete('/url/:shortUrl', async (req, res) => {
    try {
        await urlsService.deleteUrl(req.params.shortUrl);
        res.status(204).end();
        //return res.redirect(url);
    } catch (err) {
        if (e.message === 'No url found') {
            res.status(404).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    }
});

// @route   PUT /api/url
// @desc    Update clic short url
router.put('/url', async (req, res) => {
    const short = req.body.shortUrl;

    try {
        await urlsService.updateClick(short);
        res.status(200).end();
        //return res.redirect(url);
    } catch (err) {
        if (e.message === 'No url found') {
            res.status(404).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    }
});

module.exports = router;