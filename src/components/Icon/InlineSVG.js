import React from 'react';
import { string, bool } from 'prop-types';

export default class InlineSVG extends React.Component {

	DataPropPrefix = 'data-'

	convertReactSVGDOMProperty = str => str.replace(/[-|:]([a-z])/g, g => g[1].toUpperCase())

	startsWith = (str, substring) => str.indexOf(substring) === 0

	serializeAttrs = map => {
		const ret = {};
		for (let prop, i = 0; i < map.length; i++) {
			const key = map[i].name;
			if ( key === 'class' ) {
				prop = 'className';
			} else if (!this.startsWith(key, this.DataPropPrefix)) {
				prop = this.convertReactSVGDOMProperty(key);
			} else {
				prop = key;
			}

			ret[prop] = map[i].value;
		}
		return ret;
	}

	getSVGFromSource = src => {
		const svgContainer = document.createElement('div');
		svgContainer.innerHTML = src;
		const svg = svgContainer.firstElementChild;
		svg.remove ? svg.remove() : svgContainer.removeChild(svg);
		return svg;
	}

	extractSVGProps = src => {
		const map = this.getSVGFromSource(src).attributes;
		return (map.length > 0) ? this.serializeAttrs(map) : null;
	}

	render() {
		const { element, raw, src, svgProps, children, ...otherProps } = this.props;

		const __html = this.getSVGFromSource(src).innerHTML || src;
		const Element = 'svg' || element;
		const elemProps = this.extractSVGProps(src) || svgProps || {};

		return <Element {...elemProps} {...otherProps}
						dangerouslySetInnerHTML={{ __html }} />
	}
}

InlineSVG.defaultProps = {
	element: 'i',
	raw: false,
	src: '',
}

InlineSVG.propTypes = {
	element: string,
	raw: bool,
	src: string.isRequired,
}