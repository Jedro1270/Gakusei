import './App.css';
import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Groups from './components/Body/Groups/Groups';
import Pomodoro from './components/Body/Pomodoro/Pomodoro';
import Notebooks from './components/Body/Notebooks/Notebooks';
import Chat from './components/Body/Chat/Chat';
import Rankings from './components/Body/Rankings/Rankings';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = { menuOpen: false, title: "Groups" };

    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(newTitle) {
    this.setState({ title: newTitle });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header title={this.state.title}/>
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