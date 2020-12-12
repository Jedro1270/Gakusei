import { styled, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Title() {
    const title = useSelector((state) => {return state.headerTitle});

    return (
        <TitleContent>
            {title}
        </TitleContent>
    );
}

const TitleContent = styled(Typography)({
    color: 'white',
    fontWeight: 'bold',
    fontSize: '50px',
    margin: '20px'
});