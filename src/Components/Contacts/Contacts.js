import React from 'react';
// import './Contacts.css';
import Scroll from '../Scroll/Scroll';
import Cardlist from '../Card/Cardlist';
import Mcardlist from '../MsgCard/Mcardlist';


class Contacts extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.data.user.name,
			imageURL: 'http://mrmrs.github.io/photos/p/3.jpg',
			friendslist: this.props.data.friendslist,
			friend: {
				name: '',
				imageURL: '',
				status: '',
				msgDatabase: ''
			},
			msgingChat: []
		}
	}


	loadChattingUser = (loadingData) => {
		this.setState({ 'msgingChat': [] });
		console.log(loadingData.msgDatabase);
		this.setState({friend: {
        'name': loadingData.name,
        'imageURL': loadingData.imageURL,
        'email':loadingData.email,
        'msgDatabase': loadingData.msgDatabase
    }})
		// var database= "rukefriendleticia";
		
		var database=loadingData.msgDatabase;
		console.log(database);
		fetch('http://localhost:3000/msges',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				database:  database
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){
					this.setState({
						msgingChat:data
					})
				}
			})

			console.log(this.state.friend.name);
			console.log(this.state.friend.msgDatabase);
			console.log(this.state.msgingChat);
	}

	render(){
		const { onRouteChange } = this.props;
	return(

		<div  className="dt w-100 h-100">


			<div className="dtc w-30 vh-100 ba b--black-20 center pa1 bg-light-yellow">
				<nav className="dt w-100 border-box bg-near-black ph3 pv2 ph3-ns">
				  <div className="dtc v-mid mid-gray  w-25">
				    <img src={this.state.imageURL} className="dib w3 v-mid h3 br-100" alt="Site Name" />
				    <p className="f6 moon-gray v-mid pl4 tr f4-ns dib " >{this.state.name}</p>
				    <div className="hide-child dib tr v-mid f3 moon-gray pa2">:
					    <div className="child absolute bg-near-black">
					        <div className="tl pa2 pointer"> Profile</div>
					        <div className="tl pa2 pointer"> New Group </div>
					        <div className="tl pa2 pointer"> Archieved </div>
					        <div className="tl pa2 pointer"> Starred </div>
					        <div className="tl pa2 pointer"> Saved </div>
					        <div className="tl pa2 pointer" onClick={() => onRouteChange('signin')} > Log out </div>
					    </div>
				  </div>
				  </div>
				</nav>

				<input id="name" className="input-reset ba b--black-20 pa2 mv2 db w-100 bg-near-white" type="text" placeholder='Search' />
			    
			    <Scroll>
				    <div>
					    <Cardlist friendlist={ this.state.friendslist } loadChattingUser={ this.loadChattingUser } />
				    </div>
			    </Scroll>
			</div>


			<div className="dtc w6-ns pa1 ba b--black-20 bg-light-silver vh-100" >
				{this.state.msgingChat.length === 0?
				<div className="tc f4">
					<h1 className="">....................................................................</h1>
					<h1 className="pv5 ph4 f-headline lh-solid" style={{ fontFamily: 'Barriecito' }}>WELCOME TO CHATTER, {this.state.name}</h1>
					<h1 className="">....................................................................</h1>
				</div>:
				<div>
		         	<div className="dt v-top w-100 border-box bg-near-black ph5 pv2 ph4-ns">
					  <div className="dtc v-mid mid-gray  w-40" >
					    <img src={ this.state.friend.imageURL } className="dib w3 v-mid h3 br-100" alt="Site Name" />
					    <p className="f6 moon-gray v-mid pl4 f4-ns dib " >{ this.state.friend.name }</p>
					  </div>
					  <div className="dtc v-mid w-60 tr">
					    <div className="link dim f6 moon-gray f4-ns dib mr3 mr4-ns" title="About">Services</div>
					    <div className="link dim f6 moon-gray f4-ns dib mr3 mr4-ns" title="Store">Blog</div>
					    <div className="link dim f6 moon-gray f4-ns dib" title="Contact">Join Us</div>
					  </div>
					</div>

					<Scroll className="bg-washed-yellow">
						<div className="w-100 border-box bg-washed-yellow ph5 pv2 ph4-ns mv1 db" style={{height: '710px', fontFamily: 'Bree Serif' }} >
							<Mcardlist msges={ this.state.msgingChat } />
						</div>
					</Scroll>
					<div className="dt w-100 border-box bg-black ph5 pv2 ph4-ns">
						
						<input placeholder="Type a message" type="text" className="mw-100 w-80 f5 input-reset ba b--black-20 pv3 ph4 border-box" />
	      				<input type="submit" value="Send" className="input-reset w-20 bg-dark-green white f5 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray" />
					</div>
				</div>
				}
	        </div>

	    </div>
		);
	}
}

export default Contacts;