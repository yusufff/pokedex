import React from 'react';
import feather from 'feather-icons';
import InlineSVG from './InlineSVG';

import './styles/Icon.css';

const Icon = ({ className, i, size, children, ...rest }) => {
	const svg = feather.icons[i].toSvg({
		width: size,
		height: size,
	});

	return (
		<i className={`icon ${className || ''}`} {...rest}>
			<InlineSVG src={svg} />
			{children}
		</i>
	)
}

Icon.defaultProps = {
	size: 24
}

export default Icon;
