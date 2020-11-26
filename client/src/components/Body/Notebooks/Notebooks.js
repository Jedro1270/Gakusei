import React, { Component } from 'react';

export default class Notebooks extends Component {
    updateTitle(title) {
        this.props.updateTitle(title)
    }

    componentDidMount() {
        this.updateTitle(this.props.title);
    }

    render() {
        return (
            <div className="Notebooks-page">
                notebooks stuff here
            </div>
        )
    }
}