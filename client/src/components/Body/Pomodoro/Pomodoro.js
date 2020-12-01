import React, { useEffect } from 'react';

export default function Pomodoro(props) {

    useEffect(() => {
        props.setTitle('Pomodoro');
    });

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
    );
}