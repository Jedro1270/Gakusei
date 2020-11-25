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
    this.state = { menuOpen: false };
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

  toggleMenu = () => {
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

  render() {
    return (
      <Router>
        <div className="App">
          <Header toggleMenu={this.toggleMenu}/>
          <Menu />
          <Switch>
            <Route path="/groups" component={Groups} />
            <Route path="/pomodoro" component={Pomodoro} />
            <Route path="/notebooks" component={Notebooks} />
            <Route path="/chat" component={Chat} />
            <Route path="/rankings" component={Rankings} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
