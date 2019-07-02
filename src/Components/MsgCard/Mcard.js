import React from 'react';

class Mcard extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
	return (
		<div>
		{	this.props.name === "Ruke"?
		<p className="f5 fr w-60 link br3 ph3 pv2 mb2 white bg-near-black">
			{this.props.msg}
		</p>:
		<p className="f5 fl w-60 link br3 ph3 pv2 mb2 white bg-dark-green">
			{this.props.msg}
		</p>
		
		
		}
	</div>
	);
}
}

export default Mcard;