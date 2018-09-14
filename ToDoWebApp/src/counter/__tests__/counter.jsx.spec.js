import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

// Import the component to test as a plain component
import { CounterPlainComponent } from '../counter';
// Import the component to test wrapped in Provider and need store thanks to redux
import Counter from '../counter'; 
// react-redux Provider require a store
import store from '../../store';

describe(`The Counter component `, () => {

    it(`render plain`, () => {

        const tree = renderer.create( 
            <CounterPlainComponent counter="1234" /> 
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});