import React, { Component } from 'react';
import Title from './Title/Title';

import { AppBar, Drawer, IconButton, styled } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationMenu from './NavigationMenu/NavigationMenu';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    openDrawer() {
        this.setState({ open: true });
    }

    closeDrawer() {
        this.setState({ open: false })
    }

    render() {
        return (
            <TitleBar>
                <IconButton onClick={this.openDrawer}>
                    <MenuButton/>
                </IconButton>
                <Drawer
                    anchor='left'
                    open={this.state.open}
                    onClose={this.closeDrawer}
                >
                    <NavigationMenu/>
                </Drawer>
                <Title title={this.props.title}/>
            </TitleBar>
        )
    }
}

const TitleBar = styled(AppBar)({
    position: "static",
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
});

const MenuButton = styled(MenuIcon) ({
    color: 'white',
    fontSize: '50px'
});