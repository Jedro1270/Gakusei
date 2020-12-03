import { List, ListItem, ListItemText, Avatar, styled } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationMenu() {
    return (
        <NavigationList>

            <UserAvatar/>

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
    width: '300px',
    textAlign: 'center'
});

const NavigationList = styled(List)({
    backgroundColor: 'rgb(121, 121, 121)'
});

const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: 'white'
});

const UserAvatar = styled(Avatar)({
    width: '200px',
    height: '200px',
    margin: '20px auto'
});