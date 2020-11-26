import React, { Component } from 'react';

export default class Groups extends Component {
    updateTitle(title) {
        this.props.updateTitle(title)
    }

    componentDidMount() {
        this.updateTitle(this.props.title);
    }
    
    render() {
        return (
            <div className="Group-page">
                group stuff here
            </div>
        )
    }
}