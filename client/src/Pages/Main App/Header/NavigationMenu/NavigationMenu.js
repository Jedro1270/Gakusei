import { List, ListItem, ListItemText, Avatar, Typography, styled } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import LevelProgressBar from './LevelProgressBar'

export default function NavigationMenu() {
    return (
        <NavigationList>

            <UserAvatar/>
            
            <UsernameDisplay>
                Username
            </UsernameDisplay>

            <LevelDisplay>
                Level 1 (50 Pts)
            </LevelDisplay>

            <LevelProgressBar value={50}/>

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
    height: '80px',
    textAlign: 'center',
});

const NavigationList = styled(List)({
    backgroundColor: 'rgb(121, 121, 121)'
});

const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: 'white',
});

const UserAvatar = styled(Avatar)({
    width: '100px',
    height: '100px',
    margin: '30px auto'
});

const UsernameDisplay = styled(Typography)({
    textAlign: 'center',
    margin: '10px',
    fontSize: '30px',
    color: 'white'
});

const LevelDisplay = styled(Typography)({
    textAlign: 'center',
    fontSize: '35px',
    color: 'white',
    fontWeight: 'bold'
});