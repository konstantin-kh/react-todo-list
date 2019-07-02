import React from 'react';

export default function Item (props) {
	const { text, onRemove  } = props;
	return (
		<li>
			{text}
			<button onClick={onRemove}>
				Remove
			</button>
		</li>
	)
}