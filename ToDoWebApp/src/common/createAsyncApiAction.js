import { createAsyncAction } from "redux-utils";
import { clientApi } from "services/utils/api";

const defaultTransformer = result => result;

/**
 * if the last arg is an object we will use that as the apiOptions
 */
const buildApiOptions = (staticOptions, args) => {
	const lastArg = args[args.length - 1];
	const apiOptions = typeof lastArg === "object" ? lastArg : {};
	let { method } = staticOptions;

	if (!method) {
		method = staticOptions.verb || "GET";
	}

	return {
		...staticOptions,
		...apiOptions,
		method
	};
};

/**
 * use for calls where we have a static link to use
 * @params (string) type - the action type
 * @params (string) link - api link
 * @params (object) [options]
 * @params (string) [options.verb='GET'] - ajax verb
 * @params (function) [options.processor] - optional custom processor to use, defaults to clientApi
 * will receive link and args as parameters
 * @params (function) [options.innerProcessor] - optional custom processor to use, will receive
 * dispatch, getState, and args as parameters
 * @params (function) [options.transformer] -
 * optional result transformer to run after processor (results) => any
 *
 * any additional options will be passed through to the processor. For example, to pass data
 * to the api, include a 'data' attribute
 */
export const createStaticAsyncAPIAction = (type, link, options = {}) => {
	const { processor, transformer, ...otherOptions } = options;
	const defaultProcessor = (dispatch, getState, ...args) =>
		(processor || clientApi)(link, buildApiOptions(otherOptions, args)).then(
			transformer || defaultTransformer
		);
	const innerProcessor = options.innerProcessor || defaultProcessor;

	let { verb } = otherOptions;
	if (!verb) {
		verb = otherOptions.method || "GET";
	}

	return createAsyncAction(type, innerProcessor, {
		verb,
		...otherOptions,
		link
	});
};

/**
* use for calls where we have a dyanmic hateoas link to use
* @params (string) type - the action type
* @params (object) options
* @params (function) options.linkSelector -
* selector to be invoked to retrieve the link - (state, args) => string
* @params (string) [options.verb='GET'] - ajax verb
* @params (function) [options.processor] - optional custom processor to use, defaults to clientApi
* will receive link and args as parameters
* @params (function) [options.innerProcessor] - optional custom processor to use, will receive
* dispatch, getState, and args as parameters
* @params (function) [options.transformer] -
* optional result transformer to run after processor (results) => any

*
* any additional options will be passed through to the processor. For example, to pass data
* to the api, include a 'data' attribute
*/
export const createAsyncAPIAction = (type, options = {}) => {
	const { processor, transformer, ...otherOptions } = options;
	const defaultProcessor = (dispatch, getState, ...args) =>
		(processor || clientApi)(
			// construct the link
			options.linkSelector(getState(), ...[].concat(args)),
			buildApiOptions(otherOptions, args)
		).then(transformer || defaultTransformer);
	const innerProcessor = options.innerProcessor || defaultProcessor;

	let { verb } = otherOptions;
	if (!verb) {
		verb = otherOptions.method || "GET";
	}

	return createAsyncAction(type, innerProcessor, {
		verb,
		...otherOptions
	});
};
