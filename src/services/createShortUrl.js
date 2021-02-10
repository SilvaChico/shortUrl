const ShortUrl = require('../models/shortUrl');


async function createShortUrl(fullUrl) {
    await ShortUrl.create({ full: fullUrl });
    //console.log(await ShortUrl.findOne(fullUrl));
    return await ShortUrl.findOne(fullUrl);
}

module.exports = createShortUrl;