import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

export default class NavigationMenu extends Component {

    render() {
        return (
            <NavigationList>
                <CustomLink to='/groups' >
                    <ListItem button>
                        <ListItemText primary={'Groups'}/>
                    </ListItem>
                </CustomLink>

                <CustomLink to='/pomodoro' >
                    <ListItem button>
                        <ListItemText primary={'Pomodoro'}/>
                    </ListItem>
                </CustomLink>

                <CustomLink to='/notebooks' >
                    <ListItem button>
                        <ListItemText primary={'Notebooks'}/>
                    </ListItem>
                </CustomLink>

                <CustomLink to='/chat' >
                    <ListItem button>
                        <ListItemText primary={'Chat'}/>
                    </ListItem>
                </CustomLink>

                <CustomLink to='/rankings' >
                    <ListItem button>
                        <ListItemText primary={'Rankings and Badges'}/>
                    </ListItem>
                </CustomLink>
            </NavigationList>
        )
    }
}

const NavigationList = styled(List)({
    backgroundColor: 'rgb(121, 121, 121)'
});

const CustomLink = styled(Link)`
    text-decoration: none;
    color: white
`;