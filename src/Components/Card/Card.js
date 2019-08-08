import React from 'react';
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


const styles = {
  fadeIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

class Card extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.name,
			imageURL: this.props.imageURL,
			email: this.props.email,
			msgDatabase: this.props.msgDatabase,
			Confirmationstatus: "Confirm"
		}
	}


	follow = () => {
		fetch('http://localhost:3000/frndrqst',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				fromperson: this.props.mainuser,
				toperson: this.state.name
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data){
						alert("friend rqst sent ! The user will appear in your contact list once he accept your friend request!!!");
					}
				})
			.catch(err => {alert(err);})
	}


	Confirm = () => {
		fetch('http://localhost:3000/confirmfrndrqst',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				fromperson: this.state.name,
				toperson: this.props.mainuser
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data){
						this.props.confirmed();
						this.setState({
							Confirmationstatus: "Confirmed"
						})
					}
				})
	}


	fillChat = () => {
		console.log(this.props);						//database will work weirdly if you will remove this line
		this.props.loadChattingUser(this.props);
	}

render(){
	return (
		<StyleRoot>
		<div style={styles.fadeIn}>
		{this.props.parameter === "friend"?
		<div className="dt w-100 bb b--black-05 pb2 mt2 pa2 bg-light-gray pointer"
		 onClick={ this.fillChat }>
	      <div className="dtc w2 w3-ns v-mid">
	        <img alt="Profile" src={this.props.imageURL} 
	        className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"/>
	      </div>
	      <div className="dtc v-mid pl4">
	        <h1 className="f4-ns lh-title black mv0">{this.props.name}</h1>
	        <h2 className="f4-ns mt0 mb0 black-60">{this.props.email}</h2>
	      </div>
	    </div>:
           <div className="dt w-100 bb b--black-05 pb2 mt2 pa2 bg-lightest-blue">
			      <div className="dtc w4 w4-ns v-mid">
			        <img alt="Profile" src={this.props.imageURL} 
			        className="ba b--black-10 db br-100 w4 w4-ns h4 h4-ns"/>
			      </div>
			      <div className="dtc v-mid pl3">
			        <h1 className="f4 f3-ns fw6 lh-title black mv0">{this.props.name}</h1>
			        <h2 className="f3 fw4 mt0 mb0 black-60">{this.props.email}</h2>
			      </div>
		          	{this.props.parameter === "Confirm"?
			          <div className="dtc tr v-mid pr3">
				          <button className="f4 button-reset bg-dark-blue ba b--black-10 dim pointer br3 pa3 black-60" 
				          onClick={ this.Confirm } type="submit" style={{ fontFamily: 'Luckiest Guy' }}>{this.state.Confirmationstatus}</button>
				      </div>:
				      <div className="dtc tr v-mid pr3">
				          <button className="f4 tr  button-reset bg-dark-green ba b--black-10 dim pointer pa3 br3 gold" 
				          onClick={ this.follow } type="submit" style={{ fontFamily: 'Luckiest Guy' }}>+ Follow</button>
				      </div>}
			</div>
		}
		</div>
		</StyleRoot>
		);
	}
}


export default Card;