import React from 'react';
import logo from '../Signin/profile.svg';
import key from '../Signin/key.svg';
import fb from '../Signin/fb.svg';
import ins from '../Signin/ins.svg';
import go from '../Signin/goo.svg';
import chico from '../Signin/chico.png';
import mail from './mail.svg';
import link from './link.svg';
import { zoomIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


const styles = {
  zoomIn: {
    animation: 'x 0.5s',
    animationName: Radium.keyframes(zoomIn, 'zoomIn')
  }
}

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			imageurl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACqHZnYq7HfFp_OshaZ-Hgc_1mjYqJrWJpc71xNWcxdts2O0j6g'
		}
	}

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
	}

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	}

	onImageurlChange = (event) => {
		this.setState({ imageurl: event.target.value });
	}

	onSubmitSignIn = () => {
		fetch('https://agile-headland-13060.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body:JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				imageurl: this.state.imageurl
			})
		})
			.then(response => response.json())
			.then(data => {
				if(data.id){
					const friends = [];
					this.props.loadUser(data, friends);
					this.props.onRouteChange('home');
				}
			})
	}

	render(){
		const { onRouteChange } = this.props;
	return(
		<StyleRoot>
		<div className="tc dt pv5 ph7" style={styles.zoomIn}>
			<div className="sans-serif dtc bg-transparent w-30 dib black relative cover bg-top" >
			 <div id="overlay" className="absolute ma1 absolute--fill bg-dark-gray o-90 z-unset  br4"></div>

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
		            style={{ fontFamily: 'Luckiest Guy' }}>Register</h1>
		        
		        <div>

		          <div className='tc ma'>
						<img className="ba b--black-10 br-100 w4 w4-ns h4 h4-ns" 
						id = 'inputimage' alt='Face' src={this.state.imageurl} 
						width='500px' height='auto'/>
				  </div>

		          <div className="v-mid">
		            <img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" 
		            src={ logo } alt='Face' width='500px' height='auto'/>
		            <input type="email" placeholder="first name" name="email" 
		            onChange={ this.onNameChange } 
		            className="input-reset dib f3 ba bw1 mw-100 p5 black b ma3 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
		          </div>

		          <div className="v-mid">
		            <img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" 
		            src={ mail } alt='Face' width='500px' height='auto'/>
		            <input type="email" placeholder="user-email" name="email" 
		            onChange={ this.onEmailChange } 
		            className="input-reset dib f3 ba bw1 mw-100 p5 black b ma3 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
		          </div>

		          <div className="v-mid">
		          	<img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" 
		          	src={ key } alt='Face' width='500px' height='auto'/>
		            <input 
		            type="password" 
		            name="password" 
		            placeholder="password" 
		            onChange={ this.onPasswordChange } 
		            className="input-reset f3 ba dib mw-100 black b ma3 p5 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
		          </div>

		          <div className="mb3 v-mid">
		            <img className="ba dib b--black-10 v-mid br-100 w1 w3-ns h1 h3-ns" 
		            src={ link } alt='Face' width='500px' height='auto'/>
		            <input type="email" placeholder="image URL" name="email" 
		            onChange={ this.onImageurlChange } 
		            className="input-reset dib f3 ba bw1 mw-100 p5 black b ma3 pv2 ph3 bg-white hover-bg-white-70 hover-gray outline-0 bn br2" />
		          </div>
		       
		          <div  className="tc">
		            <input className="input-reset tc white f6 b ttu mh2 w-70 pa3 pointer bg-black hover-bg-near-black bn br-pill" 
		            value="Register" 
		            onClick={ this.onSubmitSignIn }
		            type="submit" />
		            <p className="serif tracked  pv1 f6 tc"
		            style={{ fontFamily: 'Abril Fatface' }}>or</p>
		            <div className="tc">
		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" title="In Beta Mode" src={ fb } alt='Face' width='500px' height='auto'/>
		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" title="In Beta Mode" src={ ins } alt='Face' width='500px' height='auto'/>
		            <img className="ba dib b--black-10 v-mid mh2 br-100 pointer w1 w2-ns h1 h2-ns" title="In Beta Mode" src={ go } alt='Face' width='500px' height='auto'/>
		          	</div>
		          </div>

		        </div>
		        <hr className="mt4"/>
		        <div className="tc b f6 mt2 glow pa2 i">
		          Already Registered ?  
		          <p 
			          className="white pointer bg-black pa2 mh5 br4" 
			          onClick={() => onRouteChange('signin')}>
			          Sign In
		          </p>
		        </div>
		        
		      </div>
		    </div>



    	</div>
    </StyleRoot>
		);
	}
}

export default Register;