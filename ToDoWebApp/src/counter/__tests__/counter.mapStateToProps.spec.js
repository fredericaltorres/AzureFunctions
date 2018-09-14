import { mapStateToProps } from '../counter';

describe(`The Counter component mapStateToProps`, () => {

    it(`mapStateToProps valid state`, () => {
        
        const actual = mapStateToProps({ counter : { value: 1 } });
        const expected = { counter: 1 };
        expect(actual).toEqual(expected);    
    });
});