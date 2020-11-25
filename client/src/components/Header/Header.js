import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Title from './Title/Title';

export default class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <button className="Header-burger">
                    <Burger />
                </button>
                <div className="Header-title">
                    <Title />
                </div>
            </div>
        )
    }
}