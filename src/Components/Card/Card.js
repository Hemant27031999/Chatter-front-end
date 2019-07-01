import React from 'react';

class Card extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.name,
			imageURL: this.props.imageURL,
			email: this.props.email
		}
		console.log("In Card");
	}

	fillChat = () => {
		this.setState({
			'name': this.props.name, 
			'email': this.props.email,
			'imageURL': this.props.imageURL
		})
		console.log(this.state);
		this.props.loadChattingUser(this.state);
	}

render(){
	return (
		<div className="dt w-100 bb b--black-05 pb2 mt2 pa2 bg-near-white pointer" onClick={ this.fillChat }>
	      <div className="dtc w2 w3-ns v-mid">
	        <img alt="Profile" src={this.props.imageURL} className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"/>
	      </div>
	      <div className="dtc v-mid pl3">
	        <h1 className="f6 f5-ns fw6 lh-title black mv0">{this.props.name}</h1>
	        <h2 className="f6 fw4 mt0 mb0 black-60">{this.props.email}</h2>
	      </div>
	      <div className="dtc v-mid">
	        <form className="w-100 tr">
	          <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Follow</button>
	        </form>
	      </div>
	    </div>
		);
	}
}


export default Card;