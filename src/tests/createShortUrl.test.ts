import 'mocha';
import sinon from 'sinon';

import { ShortUrl } from '../models/shortUrl';
import createShortUrl from '../services/createShortUrl';

let sandbox: sinon.SinonSandbox;

let createStub: sinon.SinonStub;

beforeEach(() => {
    sandbox = sinon.createSandbox();
    createStub = sandbox.stub(ShortUrl, 'create');
    createStub.resolves({ short: 'test' })
});

afterEach(() => {
    sandbox.restore();
});

describe('Creates Short URL', () => {

    it('creates short URL', async () => {
        await createShortUrl('test');
        sinon.assert.calledWith(createStub, { full: 'test' });
    });


});

