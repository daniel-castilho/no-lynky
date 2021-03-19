const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');
const app = express();

mongoose.connect('mongodb+srv://tyny:j60w9P2auUXwVcVK@cluster0.sx04z.mongodb.net/tyny?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await shortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(short.full);
});

app.listen(process.env.PORT || 3000);

