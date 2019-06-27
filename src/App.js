import React, { Component } from 'react';
import './App.css';
import Contacts from './Components/Contacts'

class App extends Component {

  render(){
  return (
    <div className="App flex">
        <Contacts className="w-30 bg-light-yellow vh-100 pa3" />
        <div className="outline w-70 bg-moon-gray vh-100 pa3 fl">
        </div>
    </div>
  );
}
}

export default App;
