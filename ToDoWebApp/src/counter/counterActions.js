import * as actionTypes from './counterActionTypes';

export const incrementAction = () => {  
    const m = {
        type: actionTypes.INCREMENT
    } 
    console.log(`counterActions.incrementAction() return ${JSON.stringify(m)}`);
    return m;
};
export const decrementAction = () => {  
    const m = {
        type: actionTypes.DECREMENT
    } 
    console.log(`counterActions.decrementAction() return ${JSON.stringify(m)}`);
    return m;
};

