/*
    jest expect doc: https://facebook.github.io/jest/docs/en/expect.html
 */
export function counterGetCounterSelector(state) {
    
    if(state === undefined) throw new Error(`state parameter cannot be undefined`);
    if(state.counter === undefined) throw new Error(`state.counter cannot be undefined`);
    if(state.counter.value === undefined) throw new Error(`state.counter.value cannot be undefined`);
    
    return state.counter.value;
}
