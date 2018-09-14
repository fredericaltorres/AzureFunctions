/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

import TraceLogger from './TraceLogger'

class TraceRedux {
	reducerStart(reduceName, state, action)	{
		const logOn = !action.type.startsWith('@@redux');
		if(logOn) console.log(`${reduceName} old-state:${JSON.stringify(state)} action:${JSON.stringify(action)}`);
	}
}

export default new TraceRedux();
