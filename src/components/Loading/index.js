import React from 'react';

import './styles/Loading.css';

const Loading = props => {
	return (
		<div
			className="loading"
			style={{
				'--size': `${props.size}px`,
				'--weight': `${props.weight}px`,
			}} />
	)
}

Loading.defaultProps = {
	size: 30,
	weight: 3,
}

export default Loading;
