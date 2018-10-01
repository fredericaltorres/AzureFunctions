import tracer from "../common/Tracer";

const actionTracerMiddleware = function f1(/*store*/) { 
	return function f2(next) {

		return function f3(action) {

			// Do nothing but trace the action 
			//console.log(`MIDDLEWARE> action:${JSON.stringify(action)}`);

			const isCompletedAction = action.type.endsWith("_COMPLETE");
			const payloadData = action.payload && action.payload.data;
			let httpInfo = "";
			if(action.payload && action.payload.status) {
				httpInfo += action.payload && action.payload.status && action.payload.status.toString()+" ";
				httpInfo += action.payload && action.payload.statusText && action.payload.statusText.toString()+" ";
				httpInfo += action.payload && action.payload.config && action.payload.config.url+" ";
			}

			tracer.log(`Middleware> action:${action.type}`);
			if(payloadData) {
				tracer.log(`  payload data:${JSON.stringify(payloadData)}`);
			}
			if(httpInfo !== "") 
				tracer.log(`  http:${httpInfo}`);

			if(isCompletedAction) {
				// const globalState = store.getState();                
				// tracer.log(`  globalState:${JSON.stringify(globalState)}`);
			}

			return next(action);
		};
	};
};
 
export default actionTracerMiddleware;