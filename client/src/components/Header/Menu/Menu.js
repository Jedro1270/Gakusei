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
            <div className="App-menu">
                <div className="close-menu" onClick={this.toggleMenu.bind(this)}>
                    <h1>
                        <button>
                            X
                        </button>
                    </h1>
                </div>
                <a href="/groups" className="Groups-drawer">
                    Groups   
                </a>
                <a href="/pomodoro" className="Pomodoro-drawer">
                    Pomodoro
                </a>
                <a href="/notebooks" className="Notebooks-drawer">               
                    Notebooks
                </a>
                <a href="/chat" className="Chat-drawer">
                    Chat             
                </a>
                <a href="/rankings" className="Rankings-drawer">          
                    Rankings and Badges          
                </a>
            </div>
        )
    }
}