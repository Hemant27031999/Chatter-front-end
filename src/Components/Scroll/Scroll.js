import React from 'react';

const Scroll = (props) => {
	return (
		<div className="bg-washed-yellow" style={{ overflowY: 'scroll', border: '1px solid black' , height: '750px'}}>
			{props.children}
		</div>
	);
}

export default Scroll;