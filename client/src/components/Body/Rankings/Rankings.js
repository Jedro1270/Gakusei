import React, { Component } from 'react';

export default class Rankings extends Component {
    updateTitle(title) {
        this.props.updateTitle(title)
    }

    componentDidMount() {
        this.updateTitle(this.props.title);
    }
    
    render() {
        return (
            <div className="Rankings-page">
                rankings stuff here
            </div>
        )
    }
}