import React from 'react';
// import './Contacts.css';
import Scroll from '../Scroll/Scroll';
import Cardlist from '../Card/Cardlist'


class Contacts extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.user.name,
			imageURL: 'http://mrmrs.github.io/photos/p/3.jpg',
			friendslist: [
						    {
						        "id": 1,
						        "name": "Young Gatchell",
						        "email": "young@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/2.jpg",
						        "lastmsg": "2019-06-29T19:19:53.046Z"
						    },
						    {
						        "id": 2,
						        "name": "Deirdre Lachance",
						        "email": "deirdre@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/4.jpg",
						        "lastmsg": "2019-02-12T02:19:23.046Z"
						    },
						    {
						        "id": 3,
						        "name": "Cleveland Ridout",
						        "email": "cleve@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/6.jpg",
						        "lastmsg": "2019-02-12T22:04:23.046Z"
						    },
						    {
						        "id": 4,
						        "name": "Leticia Fearon",
						        "email": "leticia@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/7.jpg",
						        "lastmsg": "2019-04-22T00:13:23.046Z"
						    },
						    {
						        "id": 5,
						        "name": "Ahmad Backer",
						        "email": "ahmed@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/8.jpg",
						        "lastmsg": "2019-05-11T02:43:23.046Z"
						    },
						    {
						        "id": 6,
						        "name": "Carlie Noakes",
						        "email": "carlie@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/9.jpg",
						        "lastmsg": "2019-05-11T00:43:34.046Z"
						    },
						    {
						        "id": 7,
						        "name": "Frederic Starner",
						        "email": "frederic@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/5.jpg",
						        "lastmsg": "2019-02-22T19:42:23.046Z"
						    },
						    {
						        "id": 8,
						        "name": "Arnoldo Degraff",
						        "email": "arnoldo@gmil.com",
						        "imageurl": "http://mrmrs.github.io/photos/p/3.jpg",
						        "lastmsg": "2019-02-10T19:19:23.046Z"
						    }
						],
			friend: {
				name: '',
				imageURL: '',
				status: ''
			}
		}
	}


	loadChattingUser = (loadingData) => {
		this.setState({friend: {
        'name': loadingData.name,
        'imageURL': loadingData.imageURL,
        'status':loadingData.status
    }})
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


			<div className="dtc w-70-ns pa1 ba b--black-20 bg-light-silver vh-100" >
				{this.state.friend.name === ''?
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

					<div className="w-100 border-box bg-washed-yellow ph5 pv2 ph4-ns mv1" style={{height: '710px'}}>Filling it complete</div>

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