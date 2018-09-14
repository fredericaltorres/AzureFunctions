import util from '../util';

describe(`Util test suite`, () => {

    beforeEach(() => {
        util.loadSettings = jest.fn(() => { return { debug: true } });
    });

    it(`util.add`, () => {

        expect( util.add( 1 , 2 )).toEqual(3);
        expect( util.loadSettings.mock.calls.length  ).toEqual(1);
    });

    it(`util.sub`, () => {

        expect( util.sub( 5 , 2 )).toEqual(3);
    });
});
