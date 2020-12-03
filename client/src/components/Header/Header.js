import React, { useState } from 'react';
import { AppBar, Drawer, IconButton, styled } from '@material-ui/core';
import { Menu, ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import Title from './Title/Title';
import NavigationMenu from './NavigationMenu/NavigationMenu';

export default function Header(props) {
    
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const backButtonNav = props.backButtonNav;

    function navigationType() {
        if (!backButtonNav) {
            return (
                <IconButton onClick={() => {setOpen(true)}}>
                    <MenuButton/>
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={() => {history.goBack()}}>
                    <BackButton/>
                </IconButton>
            );
        }
    }

    return (
        <TitleBar>

            {navigationType()}

            <Drawer
                anchor='left'
                open={open}
                onClose={()=> {setOpen(false)}}
            >
                <NavigationMenu/>
            </Drawer>
            <Title title={props.title}/>
        </TitleBar>
    );
}

const TitleBar = styled(AppBar)({
    position: 'static',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
});

const MenuButton = styled(Menu)({
    color: 'white',
    fontSize: '50px'
});

const BackButton = styled(ArrowBack)({
    color: 'white',
    fontSize: '50px'
});