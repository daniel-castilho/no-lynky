const express = require('express');
const database = require('./infra/db');
const app = express();

const PORT = process.env.PORT || 3000;

// Connect to Database
database();

app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }), express.urlencoded({ extended: false }));
app.use('/api', require('./routes/urlRoute'));
app.use(function (error, req, res, next) {
    if (error.message === 'No url found') {
        return res.status(404).send(error.message);
    }
    if (error.message === 'Url already exists') {
        return res.status(409).send(error.message);
    }
    return res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
