/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

const tracePrefix = '';

class TraceLogger {
	traceOn = true;

	isTraceOn() {
		return this.traceOn;
	}
	internalTrace(text, style0, style1, logMethod) {
		if (this.isTraceOn()) logMethod(text, style0, style1);
	}
	getTraceId = (instance) => {
		if (instance.getTraceId) if (instance.getTraceId()) return `(${instance.getTraceId()})`;
		return '';
	};
	getName(instance) {
		if (instance && instance.name) return `- ${instance.name} ${this.getTraceId(instance)}`;
		return '';
	}
	getPrefix = () => {
		const d = new Date().toLocaleTimeString('en-US');
		return `${d}-${tracePrefix}`;
	};
	log(m, instance = null) {
		const mm = `[${this.getPrefix()}${this.getName(instance)}]`;
		this.internalTrace(`%c ${mm}%c ${m}`, 'color:green;', 'color:blue;', console.log);
		return mm + m;
	}
	error(m, instance = null) {
		const mm = `[${this.getPrefix()}${this.getName(instance)}]`;
		this.internalTrace(`%c ${mm}%c ${m}`, 'color:green;', 'color:red;', console.error);
		return mm + m;
	}
	warn(m, instance = null) {
		const mm = `[${this.getPrefix()}${this.getName(instance)}]`;
		this.internalTrace(`%c ${mm}%c ${m}`, 'color:green;', 'color:yellow;', console.warn);
		return mm + m;
	}
}

export default new TraceLogger();
