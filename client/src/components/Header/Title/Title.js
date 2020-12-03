import { styled, Typography } from '@material-ui/core';
import React from 'react';

export default function Title(props) {
    return (
        <TitleContent>
            {props.title}
        </TitleContent>
    );
}

const TitleContent = styled(Typography)({
    color: 'white',
    fontWeight: 'bold',
    fontSize: '50px',
    margin: '20px'
});