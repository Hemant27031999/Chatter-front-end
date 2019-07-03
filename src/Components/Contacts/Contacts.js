import React, { Component } from 'react';
import Scroll from '../Scroll/Scroll';
import Cardlist from '../Card/Cardlist';
import Mcardlist from '../MsgCard/Mcardlist';


class Contacts extends Component {

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
			msgingChat: [],
			msg:'',
			searchfield:''
		}
	}


	loadChattingUser = (loadingData) => {

		this.setState({ 'msgingChat': [] }, () => {console.log("CheckPoint1");});
		
		this.setState({friend: {
		        'name': loadingData.name,
		        'imageURL': loadingData.imageURL,
		        'email':loadingData.email,
		        'msgDatabase': loadingData.msgDatabase
		    }}, () => {console.log("CheckPoint2");})

		var database=loadingData.msgDatabase;
		
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
					}, () => {console.log("CheckPoint3");})
				}
			})
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	}

	onInputChange = (event) => {
	    this.setState({ msg:event.target.value });
	  	}

	updateMsgingChat = () => {
		// this.setState({ 'msgingChat': [] });
		fetch('http://localhost:3000/newmsges',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				database:  this.state.msgDatabase,
				name: this.state.name,
				msg: this.state.msg
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){
					this.setState({
						msgingChat:data}, () => {
						  console.log(this.state.msgingChat[this.state.msgingChat.length-1]);
						  this.forceUpdate();
						})
					}
				})
	}

	render(){

		const { onRouteChange } = this.props;

		var filterfriendslist = this.state.friendslist.filter(friendslistitem => {
		return friendslistitem.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		});

		{console.log( filterfriendslist )}

	return(

		<div  className="dt w-100 h-100">

			<div className="dtc w-30 vh-100 ba b--black-20 center pa1 bg-light-yellow">
				<nav className="dt w-100 border-box bg-near-black ph3 pv2 ph3-ns">
				  <div className="dtc v-mid mid-gray  w-25">
				    <img src = { this.state.imageURL } className="dib w3 v-mid h3 br-100" alt="Site Name" />
				    <p className="f6 moon-gray v-mid pl4 tr f4-ns dib " > { this.state.name } </p>
				    <div className="hide-child fr dib tr v-mid f3 moon-gray ">
				    <img className="dib w3 v-mid h3" src="http://ice.ethz.ch/images/menu.png" alt="List" />
					    <div className="child absolute bg-near-black">
					        <div className="tl pa2 pointer"> Profile</div>
					        <div className="tl pa2 pointer"> New Group </div>
					        <div className="tl pa2 pointer"> Search </div>
					        <div className="tl pa2 pointer"> Starred </div>
					        <div className="tl pa2 pointer"> Saved </div>
					        <div className="tl pa2 pointer" onClick={() => onRouteChange('signin')} > Log out </div>
					    </div>
				  </div>
				  </div>
				</nav>

				<input id="name" onChange={this.onSearchChange} className="input-reset ba b--black-20 pa2 mv2 db w-100 bg-near-white" type="text" placeholder='Search' />
			    
			    <Scroll>
				    <div>
				   		{console.log( filterfriendslist )}
					    <Cardlist friendlist={ filterfriendslist } loadChattingUser={ this.loadChattingUser } />
				    </div>
			    </Scroll>
			</div>


			<div className="dtc w6-ns pa1 ba b--black-20 bg-light-silver vh-100" >
				{	
					this.state.msgingChat.length === 0?
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
						<input placeholder="Type a message" type="text" onChange={ this.onInputChange } className="mw-100 w-80 f5 input-reset ba b--black-20 pv3 ph4 border-box" />
	      				<button value="Send" onClick={ this.updateMsgingChat } className="input-reset w-20 bg-dark-green white f5 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray" >Send</button>
					</div>
				</div>
				}
	        </div>

	    </div>
		);
	}
}

export default Contacts;