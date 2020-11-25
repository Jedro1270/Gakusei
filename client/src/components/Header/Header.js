import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Title from './Title/Title';

export default class Header extends Component {
    toggleMenu() {
        this.props.toggleMenu()
    }

    render() {
        return (
            <div className="App-header">
                <button className="Header-burger" onClick={this.toggleMenu.bind(this)}>
                    <Burger />
                </button>
                <div className="Header-title">
                    <Title />
                </div>
            </div>
        )
    }
}