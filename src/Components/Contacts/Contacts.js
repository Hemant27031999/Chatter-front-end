import React, { Component } from 'react';
import Scroll from '../Scroll/Scroll';
import Cardlist from '../Card/Cardlist';
import Mcardlist from '../MsgCard/Mcardlist';
import Pusher from 'pusher-js';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';

const ROOT_CSS = css({
  height: 710,
  background: "#FFDFDF"
});


class Contacts extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.data.user.name,
			imageURL: this.props.data.user.imageurl,
			friendslist: this.props.data.friendslist,
			email: this.props.data.email,
			friend: {
				name: '',
				email: '',
				imageURL: '',
				status: '',
				msgDatabase: ''
			},
			msgingChat: [],
			msg:'',
			searchfield:'',
			searchfriends:'', 
			generallist: [],
			branch: 'welcome',
			test:'',
			rqstlist: [],
			inMsgField: ''
		}
	}

	componentDidMount() {
		
	    Pusher.logToConsole = true;

	    var pusher = new Pusher('7c4198eef984dd85a08e', {
	      cluster: 'ap2',
	      forceTLS: true
	    });

	    var channel = pusher.subscribe(`${this.props.data.user.email}-channel`);

	    channel.bind('my-event', data => {

	      fetch('http://localhost:3000/newmsges',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				database:  data.database,
				name: this.state.name,
				msg: "@nomsg@",
				toperson: ""
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){

					fetch('http://localhost:3000/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'}
					})
						.then(result => result.json())
						.then(friends => {
							if(friends.length !== 0){
								this.setState({
									msgingChat: data,
									friendslist: friends
									}, () => { console.log( this.state.friendslist ) })
								}
						})
						.catch(err => {
							console.log(err);
						})

					}
				})

	    });
	}


	loadChattingUser = (loadingData) => {

		this.setState({ 'msgingChat': [] });

		this.setState({friend: {
		        'name': loadingData.name,
		        'imageURL': loadingData.imageURL,
		        'email':loadingData.email,
		        'msgDatabase': loadingData.msgDatabase
		    }})

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
						msgingChat: data,
						branch: 'chat'
					})
				}
			})

		this.setState({ 'branch': 'chat' })
	}

	onSearchChangeContactfrnd = (event) => {
		this.setState({ searchfield: event.target.value});
	}

	onSearchChangeNewfrnd = (event) => {
		this.setState({ searchfriends: event.target.value,
		 				branch: 'search'});
	}

	onInputChange = (event) => {
	    this.setState({ 
	    	inMsgField: event.target.value,
	    	msg:event.target.value 
	    });
	  	}

	toSearch = () => {
		this.setState({ 'generallist': [] });
		fetch('http://localhost:3000/allusers',{
			method: 'post',
			headers: {'Content-Type':'application/json'}
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){
					this.setState({
						rqstlist: [],
						branch: 'search',
						generallist: data
						})
					}
				})
	}

	myRequests = () => {
		this.setState({ 'rqstlist': [] });
		fetch('http://localhost:3000/showfrndrqst',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				toperson:  this.state.name
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){
					this.setState({
						branch: 'frndrqst',
						rqstlist: data
						}, () => { console.log(this.state.rqstlist) })
					}
				})
	}

	updateMsgingChat = () => {
		console.log(this.state.msg)

		fetch('http://localhost:3000/newmsges',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				database:  this.state.friend.msgDatabase,
				name: this.state.name,
				msg: this.state.msg,
				email: this.state.friend.email,
				toperson: this.state.friend.name
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.length !== 0){

					fetch('http://localhost:3000/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'}
					})
						.then(result => result.json())
						.then(friends => {
							if(friends.length !== 0){
								this.setState({
									msgingChat: data,
									friendslist: friends
									})
								}
						})
						.catch(err => {
							console.log(err);
						})

					}
				})

		this.setState({ inMsgField: '' })
	}

	confirmed = () => {
		fetch('http://localhost:3000/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'}
					})
						.then(result => result.json())
						.then(friends => {
							if(friends.length !== 0){
								this.setState({
									friendslist: friends
								})
							}
						})
						.catch(err => { console.log(err); })
	}

	render(){

		const { onRouteChange } = this.props;

		var filterfriendslist = this.state.friendslist.filter(friendslistitem => {
		return friendslistitem.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		});

		var filtersearchfriendslist = this.state.generallist.filter(generallistitem => {
		return generallistitem.name.toLowerCase().includes(this.state.searchfriends.toLowerCase())
		});

	return(

		<div  className="dt w-100 h-100 ">

			<div className="dtc w-30 vh-100 ba b--black-20 center pa1 bg-light-yellow">
				<nav className="dt w-100 border-box bg-near-black ph3 pv2 ph3-ns">
				  <div className="dtc v-mid mid-gray  w-25">
				    <img src = { this.state.imageURL } className="dib w3 v-mid h3 br-100" alt="Site Name" />
				    <p className="f6 moon-gray v-mid pl4 tr f4-ns dib " > { this.state.name } </p>
				    <div className="hide-child fr dib tr v-mid f3 moon-gray ">
				    <img className="dib w3 v-mid h3" src="http://ice.ethz.ch/images/menu.png" alt="List" />
					    <div className="child absolute bg-near-black animated infinite bounce delay-2s">
					        <div className="tl pa2 pointer"> Profile</div>
					        <div className="tl pa2 pointer"> New Group </div>
					        <div className="tl pa2 pointer" onClick={ this.toSearch }> Search </div>
					        <div className="tl pa2 pointer" onClick={ this.myRequests }> Requests </div>
					        <div className="tl pa2 pointer"> Saved </div>
					        <div className="tl pa2 pointer" onClick={() => onRouteChange('signin')} > Log out </div>
					    </div>
				  </div>
				  </div>
				</nav>

				<input id="name" onChange={ this.onSearchChangeContactfrnd } className="input-reset ba b--black-20 pa2 mv2 db w-100 bg-near-white" type="text" placeholder='Search' />
			    
			    <Scroll>
				    <div>
					    <Cardlist mainuser = { this.state.name } parameter = { "friend" } friendlist={ filterfriendslist } loadChattingUser={ this.loadChattingUser } />
				    </div>
			    </Scroll>
			</div>


			<div className="dtc w6-ns pa1 ba b--black-20 bg-black vh-100" >
				{this.state.branch === 'chat'?
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

					<ScrollToBottom  className={ ROOT_CSS } >
						<div className="w-100 border-box ph5 pv2 ph4-ns mv1 db"
						 	 style={{height: '710px', fontFamily: 'Bree Serif' }} 
						 	 >
							<Mcardlist msges={ this.state.msgingChat } />
						</div>
					</ScrollToBottom>

					<div className="dt w-100 border-box bg-black ph1 pv2 ph1-ns">
						<input placeholder="Type a message" type="text" value={ this.state.inMsgField } ref="msgInput"  onChange={ this.onInputChange } className="mw-100 w-80 f5 input-reset ba b--black-20 pv3 ph4 border-box" />
	      				<button value="Send" onClick={ this.updateMsgingChat } className="input-reset w-20 bg-dark-green white f5 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray" >Send</button>
					</div>
				</div>:
				(this.state.branch === "frndrqst"?
				<div className="tc f4 mh3">
					<h1 className="ba b--black-20 f4 mb3 pa3 w-100 border-box bg-near-white"> Friend Requests</h1>
				    <Scroll className="bg-black">
					    <div>
						    <Cardlist mainuser = { this.state.name } parameter = { "Confirm" } confirmed = { this.confirmed } friendlist={ this.state.rqstlist } />
					    </div>
				    </Scroll>
			    </div>:
				(this.state.branch === 'search'?
				<div className="tc f4 mh3">
					<input id="srchfrnd" onChange={ this.onSearchChangeNewfrnd } className="input-reset ba b--black-20 f4 mb3 pa3 w-100 border-box bg-near-white" type="text" placeholder='Search New Friends' />
				    <Scroll className="bg-black">
					    <div>
						    <Cardlist mainuser = { this.state.name } parameter = { "searchfrnds" } friendlist={ filtersearchfriendslist } />
					    </div>
				    </Scroll>
			    </div>:
				<div className="tc f4 white">
					<h1 className="">....................................................................</h1>
					<h1 className="pv5 ph4 f-headline lh-solid" style={{ fontFamily: 'Barriecito' }}>WELCOME TO CHATTER, {this.state.name}</h1>
					<h1 className="">....................................................................</h1>
				</div>
				)
				)
			}
	        </div>
	    </div>
		);
	}
}

export default Contacts;


//       var channel = pusher.subscribe(`${this.props.data.user.name}-channel`);
  //       console.log(`${this.props.data.user.name}-channel`);
  //       channel.bind('my-event', data => {
  // //         fetch('http://localhost:3000/newmsges',{
		// // 	method: 'post',
		// // 	headers: {'Content-Type':'application/json'},
		// // 	body:JSON.stringify({
		// // 		database:  data.database,
		// // 		name: this.state.name,
		// // 		msg: "@nomsg@",
		// // 		toperson: ""
		// // 	})
		// // })
		// // 	.then(response => response.json())
		// // 	.then(data => {
		// // 		if(data.length !== 0){
		// // 			this.setState({
		// // 				msgingChat: data})
		// // 			}
		// // 		})

		// alert("You got a msg buddy !");
  //       });	