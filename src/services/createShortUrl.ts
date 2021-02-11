import { ShortUrl } from '../models/shortUrl';

async function createShortUrl(fullUrl: string) {
    await ShortUrl.create({ full: fullUrl });
    return await ShortUrl.findOne({ full: fullUrl });
}

export = createShortUrl;