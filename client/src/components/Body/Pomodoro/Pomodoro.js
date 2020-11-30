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
                <div className="Pomodoro-members">
                    <div className="Member">
                        <div className="Member-status" />
                        Groupmate Name
                    </div>
                    <div className="Member">
                        <div className="Member-status" />
                        Groupmate Name
                    </div>
                    <div className="Member">
                        <div className="Member-status" />
                        Groupmate Name
                    </div>
                    <div className="Member">
                        <div className="Member-status" />
                        Groupmate Name
                    </div>
                </div>

                <div className="Pomodoro-counter">
                    <h1>
                        Pomodoros Finished: 5
                    </h1>
                </div>

                <div className="Pomodoro-timer">
                    <h1>
                        25:00
                    </h1>
                </div>

                <div className="Pomodoro-button">
                    <button>
                        START
                    </button>
                </div>
            </div>
        )
    }
}