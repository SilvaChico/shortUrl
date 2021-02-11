import { Model } from 'mongoose';
import { ShortUrl } from '../models/shortUrl'

async function getShortUrl(shortUrl: string) {
    const sUrl = await ShortUrl.findOne({ short: shortUrl });
    if (!sUrl) throw new Error('URL does not exist');

    console.log(sUrl);
    sUrl.clicks++;
    sUrl.save();
    return sUrl.full;
}

export = getShortUrl;