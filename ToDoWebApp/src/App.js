import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './counter/Counter';
import UserInfo from './user/UserInfo';
import Weather from './weather/Weather';
import NotificationViewer from './notificationViewer/NotificationViewer'

class App extends Component {
  constructor() {
    super();
    console.log(`App.constructor()`);
  }
  render() {
    console.log(`App.render()`);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
          <img src={logo} className="App-logo" alt="logo" />
          Redux Demo with React</h1>
        </header>

        <NotificationViewer/>
        <hr/>
        <Counter />
        <hr/>
        <UserInfo />
        <hr/>
        <Weather />
        <br/><br/>
        <footer className="App-footer">
          Frederic Torres
        </footer>
      </div>
    );
  }
}

export default App;
