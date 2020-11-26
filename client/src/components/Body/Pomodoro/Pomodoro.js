import React, { Component } from 'react';

export default class Pomodoro extends Component {
    updateTitle(title) {
        this.props.updateTitle(title)
    }

    componentDidMount() {
        this.updateTitle(this.props.title);
    }

    render() {
        return (
            <div className="Pomodoro-page">
                Pomodoro stuff here
            </div>
        )
    }
}