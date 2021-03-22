const express = require('express');
const connectDB = require('./config/db');
const app = express();

const PORT = 3000;

// Connect to Database
connectDB();

app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }), express.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
