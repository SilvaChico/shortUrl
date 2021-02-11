import { model, Schema, Model, Document } from 'mongoose';
import shortId from 'shortid';

interface IShortUrl extends Document {
    full: string;
    short: string;
    clicks: number;
}

export const shortUrlSchema = new Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

export const ShortUrl: Model<IShortUrl> = model('ShortUrl', shortUrlSchema);
