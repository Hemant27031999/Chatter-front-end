import React from 'react';
import Mcard from './Mcard';

const Mcardlist = ({ msges }) => {

	const cardComponent = msges.map((user, i) => {
		return <Mcard key={i} id={msges[i].id} name = {msges[i].name} msg={msges[i].msg} />
	})
	
	return (
		<div>
		  	{cardComponent}
	  	</div>	
	);
}

export default Mcardlist;

// import React from 'react';
// import Card from './Card';

// const CardList = ({ robots }) => {
// 	const cardComponent = robots.map((user, i) => {
// 		return <Card key={i} id={robots[i].id} name = {robots[i].name} email={robots[i].email}/>
// 	})
	
// 	return (
// 		<div>
// 		  	{cardComponent}
// 	  	</div>	
// 	);
// }

// export default CardList;


// import React from 'react';
// import Card from './Card';

// class Cardlist extends React.Component {

// 	constructor(props){
// 		super(props);
// 		console.log("Clicked");
// 	}

// 	cardComponent = this.props.friendlist.map((user, i) => {
// 		return <Card key={i} id={this.props.friendlist[i].id} name = {this.props.friendlist[i].name} imageURL={this.props.friendlist[i].imageurl} email={this.props.friendlist[i].email} msgDatabase={ this.props.friendlist[i].msgdata } loadChattingUser={ this.props.loadChattingUser } />
// 	})
	
// render(){
// 	return (
// 		<div>
// 		  	{this.cardComponent}
// 	  	</div>	
// 	);
// }
// }

// export default Cardlist;