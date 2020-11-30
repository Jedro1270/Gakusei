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
                <div className="Notebook">
                    <h1>
                        Notebook 1
                    </h1>
                </div>
                <div className="Notebook">
                    <h1>
                        Notebook 2
                    </h1>
                </div>
                <div className="Notebook">
                    <h1>
                        Notebook 3
                    </h1>
                </div>
            </div>
        )
    }
}