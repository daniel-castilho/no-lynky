const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');
const app = express();

mongoose.connect('mongodb+srv://tyny:j60w9P2auUXwVcVK@cluster0.sx04z.mongodb.net/tyny?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const tynyUrl = localStorage.getItem('tynyUrl') != undefined ? localStorage.getItem('tynyUrl') : [];
    //console.log('tynyUrl', JSON.parse(localStorage.getItem('tynyUrl')));
    console.log('shortUrls', tynyUrl);
    res.render('index', { shortUrls: JSON.parse(tynyUrl) });
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
        .then(tynyUrl => {
            let temp;
            if (localStorage.getItem('tynyUrl')) {
                temp = JSON.stringify([tynyUrl, localStorage.getItem('tynyUrl')]);
            } else {
                temp = JSON.stringify([tynyUrl]);
            }
            console.log(temp);
            localStorage.setItem('tynyUrl', temp);
        })
        .catch(res.sendStatus(404));
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);

