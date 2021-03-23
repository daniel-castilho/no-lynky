const e = require('express');
const express = require('express');
const router = express.Router();
const urlService = require('../services/urlService');

// @route   GET /url
// @desc    Get all urls
router.get('/url', async (req, res, next) => {
    try {
        res.status(200).json(await urlService.getUrls());
    } catch (err) {
        next(err);
    }
});

// @route   GET /url/:shortUrl
// @desc    Given short url and return original/full url
router.get('/url/:shortUrl', async (req, res, next) => {
    try {
        const url = await urlService.updateClick(req.params.shortUrl);
        res.status(200).json(url.full);
    } catch (err) {
        next(err);
    }
});

// @route   POST /api/url
// @desc    Create short URL
router.post('/url', async (req, res, next) => {
    const full = req.body.fullUrl;

    try {
        const newUrl = await urlService.saveUrl(full);
        res.status(201).json(newUrl);
    } catch (err) {
        next(err);
    }
});

// @route   DELETE /api/url/:shortUrl
// @desc    Delete short URL
router.delete('/url/:shortUrl', async (req, res, next) => {
    try {
        await urlService.deleteUrl(req.params.shortUrl);
        res.status(200).json('Update with success!').end();
        //return res.redirect(url);
    } catch (err) {
        next(err);
    }
});

// @route   PUT /api/url
// @desc    Update clic short url
router.put('/url', async (req, res, next) => {
    const short = req.body.shortUrl;

    try {
        await urlService.updateClick(short);
        res.status(200).json('Update with success!').end();
        //return res.redirect(url);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
