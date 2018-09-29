import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import InlineError from "components/InlineError";
import Spinner from "components/Spinner";

/* eslint-disable-next-line react/prop-types */
const defaultErrorRenderer = ({ error }) => <InlineError>{error}</InlineError>;

/**
 * Standard loader.
 * if isLoading, shows loader, otherwise uses renderer prop
 * will call loader method on mount if isLoading
 */
class Loader extends PureComponent {
	componentDidMount() {
		this.load(this.props);
	}
	componentWillReceiveProps(nextProps) {
		const { shouldLoad } = this.props;
		if (nextProps.shouldLoad && !shouldLoad) {
			this.load(nextProps);
		}
	}

	getRenderer = () => {
		const { isLoading, spinnerRenderer, error, errorRenderer, shouldLoad, renderer } = this.props;

		if (error) {
			return errorRenderer;
		} else if (shouldLoad || isLoading) {
			return spinnerRenderer;
		}

		return renderer;
	};

	load = props => {
		const { isLoading, shouldLoad, loader, renderer, ...restProps } = props;

		if (shouldLoad) {
			loader(restProps);
		}
	};

	render() {
		// important to extract any loader centric props
		const {
			isLoading,
			shouldLoad,
			renderer,
			errorRenderer,
			spinnerRenderer,
			loader,
			error,
			...restProps
		} = this.props;

		return this.getRenderer()(restProps);
	}
}
Loader.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	shouldLoad: PropTypes.bool,
	renderer: PropTypes.func.isRequired,
	errorRenderer: PropTypes.func,
	spinnerRenderer: PropTypes.func,
	loader: PropTypes.func,
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.shape({})])
};
Loader.defaultProps = {
	shouldLoad: false,
	loader: () => {},
	spinnerRenderer: () => <Spinner />,
	errorRenderer: defaultErrorRenderer,
	error: ""
};
export default Loader;
