import 'mocha';
import * as chai from 'chai';
import sinon from 'sinon';

import { ShortUrl } from '../models/shortUrl';
import getFullUrl from '../services/getFullUrl';

const expect: Chai.ExpectStatic = chai.expect;
let sandbox: sinon.SinonSandbox;

let findOneStub: sinon.SinonStub;

beforeEach(() => {
    sandbox = sinon.createSandbox();
    findOneStub = sandbox.stub(ShortUrl, 'findOne');
});

afterEach(() => {
    sandbox.restore();
});

describe('Get Full URL', () => {

    it('gets full URL', async () => {
        findOneStub.resolves(
            {
                clicks: 0,
                short: 'test',
                full: 'test',
                save: () => -1
            }
        );
        const result = await getFullUrl('test');
        sinon.assert.calledWith(findOneStub, { short: 'test' });
        expect(result).to.equal('test');
    });

    it('tries to get a non existing url', async () => {
        findOneStub.resolves(null);
        try {
            await getFullUrl('test');
        } catch (error) {
            console.log(error.message);
            expect(error.message).to.equal('URL does not exist')
        }
    });

});

