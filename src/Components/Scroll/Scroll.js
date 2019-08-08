import React from 'react';

const Scroll = (props) => {
	return (
		<div className="bg-washed-yellow" style={{ overflowY: 'scroll', height: '1000px'}}>
			{props.children}
		</div>
	);
}

export default Scroll;

