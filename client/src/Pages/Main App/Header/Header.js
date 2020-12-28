import React, { useState } from 'react';
import { AppBar, Button, Drawer, IconButton, styled, Typography } from '@material-ui/core';
import { Menu, ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Title from './Title/Title';
import NavigationMenu from './NavigationMenu/NavigationMenu';

export default function Header(props) {

    const [openDrawer, setOpenDrawer] = useState(false);
    const history = useHistory();

    const headerNavigation = useSelector((state) => { return state.headerNavigation })

    function navigationType() {
        if (headerNavigation === 'DRAWER') {
            return (
                <IconButton onClick={() => { setOpenDrawer(true) }}>
                    <MenuButton />
                </IconButton>
            );
        } else if (headerNavigation === 'BACK_BUTTON') {
            return (
                <IconButton onClick={() => { history.goBack() }}>
                    <BackButton />
                </IconButton>
            );
        }
    }

    return (
        <TitleBar>

            {navigationType()}

            <Drawer
                anchor='left'
                open={openDrawer}
                onClose={() => { setOpenDrawer(false) }}
            >
                <NavigationMenu />
            </Drawer>

            <Title />

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