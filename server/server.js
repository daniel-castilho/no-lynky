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

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
