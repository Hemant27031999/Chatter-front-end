import React from 'react';

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
		fetch('http://localhost:3000/register',{
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
			<div className="sans-serif w-100 white mw6 center relative cover bg-top mt2" style={{backgroundImage: `url(https://www.photocollage.com/pics/logo-en.png)`}}>
		      <div id="overlay" className="absolute absolute--fill bg-navy o-70 z-unset"></div>

		      <div className="relative pa4 pa5-m">
		        <h1 className="serif tracked ma0 mb4 pv3">Register</h1>
		        <div>
		          <div className='tc ma'>
						<img className="ba b--black-10 br-100 w4 w4-ns h4 h4-ns" id = 'inputimage' alt='Face' src={this.state.imageurl} width='500px' height='auto'/>
				  </div>
		          <div className="mb3">
		            <label htmlFor="username" className="db f6 white-80 ttu ph2 mb2">Username</label>
		            <input type="text" name="username" onChange={ this.onNameChange } className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" />
		          </div>
		          <div className="mb3">
		            <label htmlFor="username" className="db f6 white-80 ttu ph2 mb2">E-mail</label>
		            <input type="email" name="email" onChange={ this.onEmailChange } className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" />
		          </div>
		          <div className="mb4">
		            <label htmlFor="password" className="db f6 white-80 ttu ph2 mb2">Password</label>
		            <input type="password" name="password" onChange={ this.onPasswordChange } className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" />
		          </div>
		          <div className="mb4">
		            <label htmlFor="imageurl" className="db f6 white-80 ttu ph2 mb2">Image URL</label>
		            <input type="text" name="imageurl" onChange={ this.onImageurlChange } className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" />
		          </div>
		          <div>
		            <input className="input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill"
		             type="submit" 
				     value="Register"
				     onClick={ this.onSubmitSignIn } />
		          </div>
		        </div>
		        
		        <div className="tc b f6 mt4 o-70 glow pa2 i">
		           Already Registered ? <p className="white pointer"  onClick={() => onRouteChange('signin')}>Sign In</p>
		        </div>
		      </div>
		    </div>
    
		);
	}
}

export default Register;