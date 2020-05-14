const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();
const connectDB = require('./config/db');
const config = require('config');
const PORT = process.env.PORT || 5000;


//connnect to DB
connectDB();

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false })) 

app.get('/',  (req, res) => {
  res.render('index')
})

//Page to check all url's and number of clicks
app.get('/allUrls', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('allUrls', { shortUrls: shortUrls })
})

app.post('/createUrl', async (req, res) => {
  const curFull = { full: req.body.fullUrl }
  await ShortUrl.create(curFull)
  const shortUrl = await ShortUrl.findOne(curFull)
  const hostname = req.hostname || config.get('baseURL')
  
  //to implement html5 history to keep same URL

  res.render('index', { 
    shortUrl: shortUrl,
    baseURL:  hostname})
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

var server = app.listen(PORT,() => console.log(`Server running on port ${PORT}`));

module.exports = server;