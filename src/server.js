const express = require('express');
const mongoose = require('mongoose');
const createShortUrl = require('./services/createShortUrl');
const app = express();
const connectDB = require('../config/db');
const config = require('config');
const path = require('path');

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('*', (req, res) => {
    res.render('index')
})

app.post('/createUrl', async(req, res) => {
    const shortUrl = await createShortUrl(req.body.fullUrl)
    const hostname = req.hostname || config.get('baseURL')

    res.render('index', {
        shortUrl: shortUrl,
        baseURL: hostname
    })
})

app.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
        shortUrl.save()

    res.redirect(shortUrl.full)
})

const PORT = process.env.PORT || 5000;
var server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;