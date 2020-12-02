import React, { useState } from 'react';
import Title from './Title/Title';

import { AppBar, Drawer, IconButton, styled } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationMenu from './NavigationMenu/NavigationMenu';

export default function Header(props) {
    
    const [open, setOpen] = useState(false);

    return (
        <TitleBar>
            <IconButton onClick={() => {setOpen(true)}}>
                <MenuButton/>
            </IconButton>
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

const MenuButton = styled(MenuIcon)({
    color: 'white',
    fontSize: '50px'
});