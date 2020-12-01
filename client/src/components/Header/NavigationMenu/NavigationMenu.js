import { List, ListItem, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationMenu() {
    return (
        <NavigationList>
            <CustomLink to='/groups' >
                <NavigationContainer button>
                    <ListItemText primary={'Groups'}/>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/pomodoro' >
                <NavigationContainer button>
                    <ListItemText primary={'Pomodoro'}/>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/notebooks' >
                <NavigationContainer button>
                    <ListItemText primary={'Notebooks'}/>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/chat' >
                <NavigationContainer button>
                    <ListItemText primary={'Chat'}/>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/rankings' >
                <NavigationContainer button>
                    <ListItemText primary={'Rankings and Badges'}/>
                </NavigationContainer>
            </CustomLink>
        </NavigationList>
    );
}

const NavigationContainer = styled(ListItem)({
    width: '350px',
    textAlign: 'center'
});

const NavigationList = styled(List)({
    backgroundColor: 'rgb(121, 121, 121)'
});

const CustomLink = styled(Link)`
    text-decoration: none;
    color: white
`;