import React from 'react';
import logo from './profile.svg';
import key from './key.svg';
import fb from './fb.svg';
import ins from './ins.svg';
import go from './goo.svg';
import chico from './chico.png';
import { fadeIn } from 'react-animations';
import { fadeOut } from 'react-animations';
import { zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


const styles = {
  fadeIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  fadeOut: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(fadeOut, 'fadeOut')
  },
  zoomIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  }
}

class Signin extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value })
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value })
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(data => {
				console.log(data.name);
				if(data.id){
					fetch('http://localhost:3000/contacts',{
						method: 'post',
						headers: {'Content-Type':'application/json'},
						body:JSON.stringify({
							name: data.name
						})
					})
						.then(result => result.json())
						.then(friends => {
								this.props.loadUser(data, friends);
								this.props.onRouteChange('home');
						})
						.catch(err => {
							console.log(err);
						})
				}
			})
			.catch(err => {
				console.log(err);
			})
	}


	render(){
		const { onRouteChange } = this.props;
	return(
		<StyleRoot>
		<div className="tc dt pv5 ph7" style={styles.zoomIn}>
			<div className="sans-serif dtc bg-transparent w-30 dib black relative cover bg-top" >
			 <div id="overlay" className="absolute ma1 absolute--fill bg-dark-gray o-90 z-unset br4"></div>

		      <div className="relative pa4 pa5-m tc">
		        <h1 className="serif tracked ma0 mb4 b pa3 white br4 f1 tc bg-black"
		            style={{ fontFamily: 'Luckiest Guy' }}>WELCOME TO CHATTER</h1>
		        <hr />
		        <p className="white ph3 f4" style={{ fontFamily: 'Righteous' }}>
		        	Hola friend! This is a simple chat app which offers you realtime messaging with your friends. You can make friends by sending friend request to your known ones.
		        	Register for free and experience the Chatter app. You are free to provide your valuable suggestions and reviews in the dowm embeded link.
		        </p>
		        <a href="https://docs.google.com/forms/d/e/1FAIpQLSctq5jRd2_uTTuH50QhYL3VSAbzvYF4dFjvYLYaVrQmboivKg/viewform?usp=sf_link">
		        <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w4-ns h1 h4-ns"
		         src={ chico } alt='Face' width='500px' height='auto'
		          />
		        </a>
		     	<div>
		      	<p className="dib mr2" style={{ fontFamily: 'Righteous' }}>
		        	Made with Love by  
		        </p>
		        <a href="https://www.facebook.com/profile.php?id=100004252209945">
		        <p className="dib white" style={{ fontFamily: 'Luckiest Guy' }}>
		        	HEMANT YADAV
		        </p>
		        </a>
		        </div>
		      </div>
			</div>

			<div className="sans-serif dtc bg-transparent w-40 dib black relative cover bg-top" >
		      <div id="overlay" className="absolute ma1 absolute--fill bg-dark-gray o-90 z-unset br4"></div>

		      <div className="relative pa4 pa5-m">
		        <h1 className="serif tracked ma0 mb4 pv3 white br4 f1 tc bg-black"
		            style={{ fontFamily: 'Luckiest Guy' }}>Sign In</h1>
		        <div>
		          <div className="v-mid">
		            <img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" 
		            src={ logo } id = 'inputimage' alt='Face' width='500px' height='auto'/>
		            <input type="email" placeholder="user-email" name="username" 
		            onChange={ this.onEmailChange } 
		            className="input-reset dib f3 ba bw1 mw-100 p5 black b ma3 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
		          </div>
		          <div className="mb4 v-mid">
		          	<img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" 
		          	src={ key } id = 'inputimage' alt='Face' width='500px' height='auto'/>
		            <input type="password" name="password" placeholder="password" 
		            onChange={ this.onPasswordChange } 
		            className="input-reset f3 ba dib mw-100 black b ma3 p5 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
		          </div>
		          <div  className="tc">
		            <input className="input-reset tc white f6 b ttu mh2 w-70 pa3 pointer bg-black hover-bg-near-black bn br-pill" 
		            value="Sign In" 
		            onClick={ this.onSubmitSignIn }
		            type="submit" />
		            <p className="serif tracked  pv1 f6 tc"
		            style={{ fontFamily: 'Abril Fatface' }}>or</p>
		            <div className="tc">
		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" title="In Beta Mode" src={ fb } id = 'inputimage' alt='Face' width='500px' height='auto'/>
		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" title="In Beta Mode" src={ ins } id = 'inputimage' alt='Face' width='500px' height='auto'/>
		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" title="In Beta Mode" src={ go } id = 'inputimage' alt='Face' width='500px' height='auto'/>
		          	</div>
		          </div>
		        </div>
		        <hr className="mt4"/>
		        <div className="tc b f6 mt2 glow pa2 i">
		          New Member? 
		          <p 
			          className="white pointer bg-black pa2 mh5 br4" 
			          onClick={() => onRouteChange('register')}>
			          Register here
		          </p>
		        </div>
		       
		      </div>
		    </div>
    </div>
    </StyleRoot>
		);
	}
}

export default Signin;


// <div id="overlay" className="absolute absolute--fill bg-dark-gray o-70 z-unset"></div>

// 		      <div className="relative pa4 pa5-m">
// 		        <h1 className="serif tracked ma0 mb4 pv3 white br4 f1 tc bg-black"
// 		            style={{ fontFamily: 'Abril Fatface' }}>Sign In</h1>
// 		        <div>
// 		          <div className="mb3 dt v-mid">
// 		            <img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" src={ logo } id = 'inputimage' alt='Face' width='500px' height='auto'/>
// 		            <input type="email" placeholder="user-email" name="username" onChange={ this.onEmailChange } className="input-reset dib f4 ba bw1 mw-100 p5 red b ma3 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
// 		          </div>
// 		          <div className="mb4 v-mid">
// 		          <img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" src={ key } id = 'inputimage' alt='Face' width='500px' height='auto'/>
// 		            <input type="password" name="password" placeholder="password" onChange={ this.onPasswordChange } className="input-reset f4 ba dib mw-100 white b ma3 p5 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
// 		          </div>
// 		          <div  className="tc">
// 		            <input className="input-reset tc light-gray f6 b ttu mh2 w-70 pa3 pointer bg-black hover-bg-near-black bn br-pill" 
// 		            value="Sign In" 
// 		            onClick={ this.onSubmitSignIn }
// 		            type="submit" />
// 		            <p className="serif tracked  pv1 f6 tc"
// 		            style={{ fontFamily: 'Abril Fatface' }}>or</p>
// 		            <div className="tc">
// 		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" src={ fb } id = 'inputimage' alt='Face' width='500px' height='auto'/>
// 		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" src={ ins } id = 'inputimage' alt='Face' width='500px' height='auto'/>
// 		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" src={ go } id = 'inputimage' alt='Face' width='500px' height='auto'/>
// 		          	</div>
// 		          </div>
// 		        </div>
		        
// 		        <div className="tc b f6 mt4 o-70 glow pa2 i">
// 		          New Member? <p className="white pointer" onClick={() => onRouteChange('register')}>Register here</p>
// 		        </div>
// 		      </div>