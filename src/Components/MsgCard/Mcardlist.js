import React from 'react';
import Mcard from './Mcard';

class Mcardlist extends React.Component {

	constructor(props){
		super(props);
		console.log("In Mcardlist");
	}

	cardComponent = this.props.msges.map((user, i) => {
		return <Mcard key={i} id={this.props.msges[i].id} name = {this.props.msges[i].name} msg={this.props.msges[i].msg} />
	})
	
render(){
	return (
		<div>
		  	{this.cardComponent}
	  	</div>	
	);
}
}

export default Mcardlist;