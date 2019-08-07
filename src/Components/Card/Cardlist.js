import React from 'react';
import Card from './Card';

class Cardlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var size = this.props.friendlist.length; 
    var cardComponent = this.props.friendlist.map((user, i) => {
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