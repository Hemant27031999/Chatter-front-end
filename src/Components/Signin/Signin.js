import React from 'react';

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
		console.log(this.state.signInEmail+" "+this.state.signInPassword);
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
				if(data.id){
					this.props.loadUser(data);
					this.props.onRouteChange('home');
				}
			})
	}


	render(){
		const { onRouteChange } = this.props;
	return(
			<div className="sans-serif w-100 white mw6 center relative cover bg-top mt2" style={{backgroundImage: `url(https://www.photocollage.com/pics/logo-en.png)`}}>
		      <div id="overlay" className="absolute absolute--fill bg-navy o-70 z-unset"></div>

		      <div className="relative pa4 pa5-m">
		        <h1 className="serif tracked ma0 mb4 pv3">Sign In</h1>
		        <div>
		          <div className="mb3">
		            <label htmlFor="username" className="db f6 white-80 ttu ph2 mb2">Username</label>
		            <input type="text" name="username" onChange={ this.onEmailChange } className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" />
		          </div>
		          <div className="mb4">
		            <label htmlFor="password" className="db f6 white-80 ttu ph2 mb2">Password</label>
		            <input type="password" name="password" onChange={ this.onPasswordChange } className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" />
		          </div>
		          <div>
		            <input className="input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill" 
		            value="Sign In" 
		            onClick={ this.onSubmitSignIn }
		            type="submit" />
		          </div>
		        </div>
		        
		        <div className="tc b f6 mt4 o-70 glow pa2 i">
		          New Member? <p className="white pointer" onClick={() => onRouteChange('register')}>Register here</p>
		        </div>
		      </div>
		    </div>
    
		);
	}
}

export default Signin;