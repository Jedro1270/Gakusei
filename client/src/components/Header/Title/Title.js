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
    textAlign: 'center',
    flexGrow: '1',
    variant: 'h2',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '50px'
});