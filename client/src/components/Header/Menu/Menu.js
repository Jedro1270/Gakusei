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
                    <a href="/pomodoro">
                        Pomodoro
                    </a>
                </div>
                <div>
                    <a href="/notebooks">
                        Notebooks
                    </a>
                </div>
                <div>
                    <a href="/chat">
                        Chat
                    </a>
                </div>
                <div>
                    <a href="/rankings">
                        Rankings and Badges
                    </a>
                </div>
            </div>
        )
    }
}