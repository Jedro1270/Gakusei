import './App.css';
import React, { Component } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Header/Menu/Menu'

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

  toggleMenu = event => {
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
      <div className="App">
        <Header toggleMenu={this.toggleMenu}/>
        <Menu />
      </div>
    );
  }
}

export default App;
