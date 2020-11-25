import React, { Component } from 'react';

export default class Menu extends Component {
    render() {
        return (
            <div className="App-menu">
                <a href="/groups">
                    Groups
                </a>
                <a href="/groups">
                    Pomodoro
                </a>
                <a href="/groups">
                    Notebooks
                </a>
                <a href="/groups">
                    Chat
                </a>
                <a href="/groups">
                    Rankings and Badges
                </a>
            </div>
        )
    }
}