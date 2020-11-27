import './App.css';
import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Menu from './components/Header/Menu/Menu';
import Groups from './components/Body/Groups/Groups';
import Pomodoro from './components/Body/Pomodoro/Pomodoro';
import Notebooks from './components/Body/Notebooks/Notebooks';
import Chat from './components/Body/Chat/Chat';
import Rankings from './components/Body/Rankings/Rankings';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { menuOpen: false, title: "Groups" };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  callAPI() {
    fetch("http://localhost:2727/groups") // Change to log/register page in the future
      .then(response => response.text())
      .then(response => this.setState({ apiResponse: response }))
      .catch(error => error)
  }

  componentDidMount() {
    this.callAPI();
  }

  toggleMenu() {
    if (window.innerWidth < 760) {
      if (this.state.menuOpen) {
        document.querySelector('.App-menu').style.transform = "translateX(-100%)";
      } else {
        document.querySelector('.App-menu').style.transform = "none";
      }
  
      this.setState(() => ({
          menuOpen: !this.state.menuOpen
        })
      );
    }
  }

  updateTitle(newTitle) {
    this.setState({ title: newTitle });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header toggleMenu={this.toggleMenu} title={this.state.title}/>
          <Menu toggleMenu={this.toggleMenu} title={this.state.title}/>
          <div className="App-body">
            <Switch>
              <Route path="/groups" render={() => (
                  <Groups updateTitle={this.updateTitle} title="Groups"/>
                )} 
              />
              <Route path="/pomodoro" render={() => (
                  <Pomodoro updateTitle={this.updateTitle} title="Pomodoro"/>
                )} 
              />
              <Route path="/notebooks" render={() => (
                  <Notebooks updateTitle={this.updateTitle} title="Notebooks"/>
                )} 
              />
              <Route path="/chat" render={() => (
                  <Chat updateTitle={this.updateTitle} title="Chat"/>
                )} 
              />
              <Route path="/rankings" render={() => (
                  <Rankings updateTitle={this.updateTitle} title="Rankings and Badges"/>
                )} 
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
