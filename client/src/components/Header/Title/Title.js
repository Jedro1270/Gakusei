import { styled, Typography } from '@material-ui/core';
import React, { Component } from 'react';

export default class Title extends Component {
    render() {
        return (
            <TitleContent>
                {this.props.title}
            </TitleContent>
        );
    }
}

const TitleContent = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 'auto',
    variant: 'h2',
    color: 'white',
    fontWeight: 'bold',
    padding: '20px',
    fontSize: '50px'
});