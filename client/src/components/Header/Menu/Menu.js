import React, { Component } from 'react';

export default class Menu extends Component {
    toggleMenu() {
        this.props.toggleMenu()
    }

    selectDrawer(title) {
        if (title === "Rankings and Badges") {
            title = "Rankings";
        }
        
        document.querySelector(`.${title}-drawer`).style.backgroundColor = "rgb(121, 121, 121)";
    }

    componentDidUpdate() {
        this.selectDrawer(this.props.title)
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
                <div className="Groups-drawer">
                    <a href="/groups">
                        Groups
                    </a>
                </div>
                <div className="Pomodoro-drawer">
                    <a href="/pomodoro">
                        Pomodoro
                    </a>
                </div>
                <div className="Notebooks-drawer">
                    <a href="/notebooks">
                        Notebooks
                    </a>
                </div>
                <div className="Chat-drawer">
                    <a href="/chat">
                        Chat
                    </a>
                </div>
                <div className="Rankings-drawer">
                    <a href="/rankings">
                        Rankings and Badges
                    </a>
                </div>
            </div>
        )
    }
}