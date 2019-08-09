import React from 'react';
import Scroll from '../Scroll/Scroll';
import Cardlist from '../Card/Cardlist';
import Mcardlist from '../MsgCard/Mcardlist';
import Pusher from 'pusher-js';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import { zoomIn } from 'react-animations';
import { fadeOut } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


const styles = {
  zoomIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  },
  fadeOut: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(fadeOut, 'fadeOut')
  }
}

const ROOT_CSS = css({
  height: '1000',
  background: "#FFDFDF"
});


class Contacts extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.data.user.name,
			imageURL: this.props.data.user.imageurl,
			friendslist: this.props.data.friendslist,
			email: this.props.data.user.email,
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
		
		// Pusher.logToConsole = true;

	 //    var pusher = new Pusher('d29496a4b6da7ece45f8', {
	 //      cluster: 'ap2',
	 //      forceTLS: true
	 //    });

	 //    var channel = pusher.subscribe('my-channel');
	 //    channel.bind('my-event', function(data) {
	 //      alert("hello world");
	 //    });

		
	    Pusher.logToConsole = true;

	    var pusher = new Pusher('7c4198eef984dd85a08e', {
	      cluster: 'ap2',
	      forceTLS: true
	    });

	    var channel = pusher.subscribe(`${this.props.data.user.email}-channel`);
	    // channel.bind('my-event', function(data) {
	    //   alert("hello world");
	    // });

	    channel.bind('my-event', data => {
	    	// console.log(`${this.props.data.user.email}-channel`);
	      fetch('https://agile-headland-13060.herokuapp.com/newmsges',{
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

					fetch('https://agile-headland-13060.herokuapp.com/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'},
						body:JSON.stringify({
							name: this.state.name
						})
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
		
		fetch('https://agile-headland-13060.herokuapp.com/msges',{
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
					}, () => {
						// console.log("loadChattingUser");
						// console.log(this.state);
					});
				}
			}) 
		this.setState({ 'branch': 'chat' });
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
		fetch('https://agile-headland-13060.herokuapp.com/allusers',{
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
		fetch('https://agile-headland-13060.herokuapp.com/showfrndrqst',{
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
						}, () => { 
							// console.log(this.state.rqstlist);
						})
					}
				else{
					alert("No friend Request !!!");
				}
				})
	}


	updateMsgingChat = () => {
		console.log("Above msg database");
		console.log(this.state);

		fetch('https://agile-headland-13060.herokuapp.com/newmsges',{
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

					fetch('https://agile-headland-13060.herokuapp.com/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'},
						body:JSON.stringify({
							name: this.state.name
						})
					})
						.then(result => result.json())
						.then(friends => {
							if(friends.length !== 0){
								this.setState({
									msgingChat: data,
									friendslist: friends
									}, () => {
										console.log("updatemsgchat");
										console.log(this.state); })
								}
						})
						.catch(err => {
							console.log(err);
						})

					}
				})

		this.setState({ inMsgField: '' });
	}



	confirmed = () => {
		fetch('https://agile-headland-13060.herokuap/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'},
						body:JSON.stringify({
							name: this.state.name
						})
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


		// console.log("User friends");
		// console.log(this.state.friendslist);
		// console.log("All users");
		// console.log(this.state.generallist);

		var namearray = this.state.friendslist.map( (obj) => {
			return obj.name;
		});

		// console.log(namearray);
		// console.log("All userlist ");
		var finalalluserlist = this.state.generallist.filter( ( el ) => {
			return !namearray.includes( el.name )} );

		// console.log(finalalluserlist);
		// alert(finalalluserlist.length);

		// var filtersearchfriendslist=this.state.friendslist;
		// if(filtersearchfriendslist.length !== 0){
		// filtersearchfriendslist = finalalluserlist.filter(generallistitem => {
		// return finalalluserlist.name.toLowerCase().includes(this.state.searchfriends.toLowerCase())
		// });
		// }

	return(
		<StyleRoot>
		<div  className="dt w-100 h-100" style={styles.zoomIn}>

			<div className="dtc w-30 vh-100 ba b--black-20 center pa1 bg-light-yellow">
				<nav className="dt w-100 border-box bg-near-black ph3 pv2 ph3-ns">
				  <div className="dtc v-mid mid-gray  w-25">
				    <img src = { this.state.imageURL } 
				    className="dib w3 v-mid h3 br-100" alt="Site Name" />
				    <p className="moon-gray v-mid pl4 tr f3-ns dib" 
				    style={{ fontFamily: 'Luckiest Guy' }}> { this.state.name } </p>
				    <div className="hide-child fr dib tr v-mid f3 moon-gray">
				    <img className="dib w3 v-mid h3" src="http://ice.ethz.ch/images/menu.png" alt="List" />
					    <div className="child absolute bg-near-black animated infinite bounce delay-2s"  style={{zIndex:1}}>
					        <div className="tl pa2 pointer" title="In Beta Mode"> Profile</div>
					        <div className="tl pa2 pointer" title="In Beta Mode"> New Group </div>
					        <div className="tl pa2 pointer" onClick={ this.toSearch }> Search Friends </div>
					        <div className="tl pa2 pointer" onClick={ this.myRequests }> Requests </div>
					        <div className="tl pa2 pointer" onClick={() => onRouteChange('signin')} > Log out </div>
					    </div>
				  </div>
				  </div>
				</nav>

				<input id="name" onChange={ this.onSearchChangeContactfrnd } 
				className="input-reset f3 ba b--black-20 pa2 mv2 db w-100 bg-near-white" type="text" 
				placeholder='Search' />
			    
			    <Scroll>
			    {this.state.friendslist.length === 0?
			    	<div>
			    		<h1 className="pv5 ph5 f-1 lh-solid" 
					style={{ fontFamily: 'Barriecito' }}>YOU DON'T HAVE ANY FRIENDS YET, SEND SOMEONE FRIEND REQUEST TO CHAT WITH HIM/HER</h1>
			    	</div>:
				    <div >
					    <Cardlist mainuser = { this.state.name } 
					    parameter = { "friend" } friendlist={ filterfriendslist } 
					    loadChattingUser={ this.loadChattingUser } />
				    </div>
				}
			    </Scroll>
			</div>


			<div className="dtc w6-ns pa1 ba b--black-20 bg-black vh-100" >
				{this.state.branch === 'chat'?
				<div>
		         	<div className="dt v-top w-100 border-box bg-near-black ph5 pv2 ph4-ns">
					  <div className="dtc v-mid mid-gray  w-40" >
					    <img src={ this.state.friend.imageURL } 
					    className="dib w3 v-mid h3 br-100" alt="Site Name" />
					    <p className="f6 moon-gray v-mid pl4 f3-ns dib" 
					    style={{ fontFamily: 'Luckiest Guy' }}>{ this.state.friend.name }</p>
					  </div>
					  <div className="dtc v-mid w-60 tr">
					    <div className="link dim f6 moon-gray f3-ns dib mr3 mr4-ns" style={{ fontFamily: 'Luckiest Guy' }} title="In Beta Mode">Search</div>
					    <div className="link dim f6 moon-gray f3-ns dib mr3 mr4-ns" style={{ fontFamily: 'Luckiest Guy' }} title="In Beta Mode">Media</div>
					    <div className="link dim f6 moon-gray f3-ns dib" style={{ fontFamily: 'Luckiest Guy' }} title="In Beta Mode">About</div>
					  </div>
					</div>

					<ScrollToBottom  className={ ROOT_CSS } >
						<div className="w-100 border-box ph5 pv2 ph4-ns mv1 db"
						 	 style={{height: '1000px', fontFamily: 'Bree Serif' }} 
						 	 >
							<Mcardlist msges={ this.state.msgingChat } mainuser = { this.state.name }/>
						</div>
					</ScrollToBottom>

					<div className="dt w-100 border-box bg-black ph1 pv2 ph1-ns">
						<input placeholder="Type a message" type="text" value={ this.state.inMsgField } 
						ref="msgInput"  onChange={ this.onInputChange } 
						style={{ fontFamily: 'Luckiest Guy' }}
						className="mw-100 w-80 f5 br3 input-reset ba b--black-20 pv3 ph4 border-box" />
	      				<button value="Send" onClick={ this.updateMsgingChat } 
	      				style={{ fontFamily: 'Luckiest Guy' }}
	      				className="input-reset w-20 bg-dark-green white br3 f5 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray" >Send</button>
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
						    <Cardlist mainuser = { this.state.name } parameter = { "searchfrnds" } friendlist={ finalalluserlist } />
					    </div>
				    </Scroll>
			    </div>:
				<div className="tc f4 white">
					<h1 className="">....................................................................</h1>
					<h1 className="pv5 ph5 f-headline lh-solid" 
					style={{ fontFamily: 'Barriecito' }}>WELCOME TO CHATTER, {this.state.name}</h1>
					<h1 className="">....................................................................</h1>
				</div>
				)
				)
			}
	        </div>
	    </div>
	    </StyleRoot>
		);
	}
}

export default Contacts;


	// onChange = (e) => {
	// 	let files = e.target.files;
	// 	let reader = new FileReader();
	// 	reader.readAsDataURL(files[0]);
	// 	reader.onload = (e) => {
	// 		console.log(e.target.result);
	// 	}
	// 	let query = this.state.query;
	// 	fetch(`https://api.imgbb.com/1/upload?key=c10a75e100a54f95368e127f445d194b&image=${e.target.result}`,{
	// 					method: 'post',
	// 					headers: {'Content-Type':'application/json'}
	// 				})
	// 					.then(result => result.json())
	// 					.then(friends => {
	// 						console.log(friends);
	// 					})
	// 					.catch(err => { console.log(err); })
	// }