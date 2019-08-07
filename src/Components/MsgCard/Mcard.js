import React from 'react';

const Mcard = (props) => {

	return (
		<div>
		{	props.name === props.mainuser?
		<p className="f5 fr w-60 link br3 ph3 pv2 mb2 white bg-near-black">
			{props.msg}
		</p>:
		<p className="f5 fl w-60 link br3 ph3 pv2 mb2 white bg-dark-green">
			{props.msg}
		</p>
		}
	</div>
	);

}

export default Mcard;