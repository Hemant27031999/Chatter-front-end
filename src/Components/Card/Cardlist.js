import React from 'react';
import Card from './Card';

class Cardlist extends React.Component {

	constructor(props){
		super(props);
		console.log("In Cardlist");
	}

	cardComponent = this.props.friendlist.map((user, i) => {
		return <Card key={i} id={this.props.friendlist[i].id} name = {this.props.friendlist[i].name} imageURL={this.props.friendlist[i].imageurl} email={this.props.friendlist[i].email} loadChattingUser={ this.props.loadChattingUser } />
	})
	
render(){
	return (
		<div>
		  	{this.cardComponent}
	  	</div>	
	);
}
}

export default Cardlist;