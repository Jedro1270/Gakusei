import React, { Component } from 'react';

export default class Menu extends Component {
    render() {
        return (
            <div className="App-menu">
                <div>
                    <a href="/groups">
                        Groups
                    </a>
                </div>
                <div>
                    <a href="/groups">
                        Pomodoro
                    </a>
                </div>
                <div>
                    <a href="/groups">
                        Notebooks
                    </a>
                </div>
                <div>
                    <a href="/groups">
                        Chat
                    </a>
                </div>
                <div>
                    <a href="/groups">
                        Rankings and Badges
                    </a>
                </div>
            </div>
        )
    }
}