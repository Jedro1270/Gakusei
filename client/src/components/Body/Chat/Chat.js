import React, { Component } from 'react';

export default class Chat extends Component {
    updateTitle(title) {
        this.props.updateTitle(title)
    }

    componentDidMount() {
        this.updateTitle(this.props.title);
    }

    render() {
        return (
            <div className="Chat-page">
                chat stuff here
            </div>
        )
    }
}