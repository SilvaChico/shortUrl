import express from 'express';
import createShortUrl from './services/createShortUrl';
import getFullUrl from './services/getFullUrl';
import connectDB from '../config/db';
import path from 'path';
const app = express();

connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/shortUrl', async (req, res) => {
    const shortUrl = await createShortUrl(req.body.fullUrl);
    const hostname = req.hostname;
    console.log(shortUrl);
    res.render('index', {
        shortUrl: shortUrl,
        baseURL: hostname
    })
})

app.get('/:shortUrl', async (req, res) => {
    try {
        const shortUrl = await getFullUrl(req.params.shortUrl)
        res.redirect(shortUrl);
    } catch (error) {
        if (req.params.shortUrl === 'shortUrl') res.redirect('/');
        return res.sendStatus(404);
    }
})

const PORT = process.env.PORT || 5000;
var server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export = server;