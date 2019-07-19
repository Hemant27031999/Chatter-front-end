import React from 'react';
import Card from './Card';

class Cardlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var size = this.props.friendlist.length; 
    const cardComponent = this.props.friendlist.map((user, i) => {
      return (
        <Card
          key={i}
          id={this.props.friendlist[size-i-1].id}
          name={this.props.friendlist[size-i-1].name}
          imageURL={this.props.friendlist[size-i-1].imageurl}
          email={this.props.friendlist[size-i-1].email}
          msgDatabase={this.props.friendlist[size-i-1].msgdata}
          loadChattingUser={this.props.loadChattingUser}
          parameter = { this.props.parameter } 
          mainuser = { this.props.mainuser }
          confirmed = { this.props.confirmed }
        />
      );
    });

    return <div>{cardComponent}</div>;
  }
}

export default Cardlist;



// 	constructor(props){
// 		super(props);
// 		console.log("Clicked");
// 	}

// 	cardComponent = this.props.friendlist.map((user, i) => {
// 		return <Card key={i} id={this.props.friendlist[i].id} parameter = { this.props.parameter } mainuser = { this.props.mainuser } confirmed = { this.props.confirmed } name = {this.props.friendlist[i].name} imageURL={this.props.friendlist[i].imageurl} email={this.props.friendlist[i].email} msgDatabase={ this.props.friendlist[i].msgdata } loadChattingUser={ this.props.loadChattingUser } />
// 	})
	
// render(){
// 	return (
// 		<div>
// 		  	{cardComponent}
// 	  	</div>	
// 	);
// }
// }

// export default Cardlist;