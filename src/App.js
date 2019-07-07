import React, { Component } from 'react';
import './App.css';
import Contacts from './Components/Contacts/Contacts';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';


const initialState = {
      route: 'signin',
      user: {
        'name':'',
        'email':'',
        imageurl:''
      },
      friendslist: []
    }


class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

   loadUser = (data, friends) => {
    this.setState({
      user: {
        'name':data.name,
        'email':data.email,
        'imageurl':data.imageurl
    },
      friendslist: friends
  })
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  render(){
  return (
    <div className="App">
        {this.state.route === 'signin'?
          <Signin loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }  />:
          ( this.state.route === 'register'?
            <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }   />:
            <Contacts data = { this.state } onRouteChange = { this.onRouteChange } />
          )
        }
    </div>
  );
}
}

export default App;
