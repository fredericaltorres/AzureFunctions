import * as counterSelector from '../counterSelector';

describe(`The Counter component selectors`, () => {

    it(`counterGetCounterSelector value 1`, () => {
        
        const data = { counter : { value: 1 } };
        const actual = counterSelector.counterGetCounterSelector(data);
        expect(actual).toEqual(1);
    });
});