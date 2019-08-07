import React from 'react';
import Mcard from './Mcard';

class Mcardlist extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
    const McardComponent = this.props.msges.map((user, i) => {
      return (
        <Mcard
          key={i}
          mainuser={this.props.mainuser}
          id={this.props.msges[i].id}
          name={this.props.msges[i].name}
          msg={this.props.msges[i].msg}
        />
      );
    });

    return <div>{ McardComponent }</div>;
  }
}

export default Mcardlist;
