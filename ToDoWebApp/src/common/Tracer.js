class Tracer {

	traceOn = true;

	internalTrace(text, style0, style1, logMethod) {
        if (this.traceOn) 
            logMethod(text, style0, style1);
	}
	getName(instance) {
		if (instance && instance.name) return instance.name;
		return '';
	}
	getTimeStamp = () => {
        const d = new Date().toLocaleTimeString('en-US');
        return d;
	};
	log(m, instance = null) {
		const mm = `[${this.getTimeStamp()}, ${this.getName(instance)}]`;
		this.internalTrace(`%c ${mm}%c ${m}`, 'color:green;', 'color:blue;', console.log);
		return mm + m;
	}
}

export default new Tracer();
