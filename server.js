const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();
const connectDB = require('./config/db');
const config = require('config');
const baseURL = config.get('baseURL');

//connnect to DB
connectDB();

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false })) 

app.get('/',  (req, res) => {
  res.render('index')
})

app.get('/allUrls', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('allUrls', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  const curFull = { full: req.body.fullUrl }
  await ShortUrl.create(curFull)
  const shortUrl = await ShortUrl.findOne(curFull)
  //res.redirect('/')
  res.render('index', { 
    shortUrl: shortUrl,
  baseURL: baseURL})
})


app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);