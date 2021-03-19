const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://tyny:j60w9P2auUXwVcVK@cluster0.sx04z.mongodb.net/tyny?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/shortUrls', (req, res) => {

})

app.listen(process.env.PORT || 3000);

