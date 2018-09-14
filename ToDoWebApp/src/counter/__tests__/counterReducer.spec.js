import counterReducer from '../counterReducer'

describe(`The counter reducer`, () => {

    it(`increment action`, () => {

        const newState0 = counterReducer( { value: 0 }, { type:'INCREMENT' } );
        expect(newState0).toEqual( { value : 1 } );
    });

    it(`decrement action`, () => {

        const state =  { value: 10 };
        const newState0 = counterReducer( state, { type:'DECREMENT' } );
        expect(newState0).toEqual( { value : 9 } );
    });

    it(`pass un supported action`, () => {

        const state =  { value: 10 };
        const newState0 = counterReducer(state, { type:'DO_SOMETHING' } );
        expect(newState0).toEqual( state );
        expect(newState0).toBe( state );
    });
});