import React, { Component } from 'react';

export default class Menu extends Component {
    toggleMenu() {
        this.props.toggleMenu()
    }

    render() {
        return (
            <div className="App-menu" onClick={this.toggleMenu.bind(this)}>
                <div className="close-menu">
                    <h1>
                        <button>
                            X
                        </button>
                    </h1>
                </div>
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