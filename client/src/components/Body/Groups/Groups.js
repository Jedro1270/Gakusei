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
                <div className="Group-buttons">
                    <button className="Create-group">
                        Create
                    </button>
                    <button className="Join-group">
                        Join
                    </button>
                </div>

                <div className="Selectable-groups">
                    <div className="sample-group">
                        <div className="Group-icon">
                            <img src="/images/group-icons/image.png"/>
                        </div>
                        <div className="Group-name">
                            Group Name
                        </div>
                    </div>
                    
                    <div className="sample-group">
                        <div className="Group-icon">
                            <img src="/images/group-icons/image.png"/>
                        </div>
                        <div className="Group-name">
                            Group Name
                        </div>
                    </div>

                    <div className="sample-group">
                        <div className="Group-icon">
                            <img src="/images/group-icons/image.png"/>
                        </div>
                        <div className="Group-name">
                            Group Name
                        </div>
                    </div>

                    <div className="sample-group">
                        <div className="Group-icon">
                            <img src="/images/group-icons/image.png"/>
                        </div>
                        <div className="Group-name">
                            Group Name
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}