import { ShortUrl } from '../models/shortUrl';

async function createShortUrl(fullUrl: string): Promise<string> {
    return (await ShortUrl.create({ full: fullUrl })).short;
}

export = createShortUrl;