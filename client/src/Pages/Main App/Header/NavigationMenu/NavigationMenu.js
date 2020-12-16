import { List, ListItem, Avatar, Typography, styled } from '@material-ui/core';
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

            <CustomLink to='/api/groups' >
                <NavigationContainer button>
                    <NavigationTitle>
                        Groups
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/pomodoro' >
                <NavigationContainer button>
                    <NavigationTitle>
                        Pomodoro
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/notebooks' >
                <NavigationContainer button>
                    <NavigationTitle>
                        Notebooks
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/chat' >
                <NavigationContainer button>
                    <NavigationTitle>
                        Chat
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/rankings' >
                <NavigationContainer button>
                    <NavigationTitle>
                        Rankings and Badges
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>
        </NavigationList>
    );
}

const NavigationContainer = styled(ListItem)({
    width: '100%',
    height: '10%',
});

const NavigationList = styled(List)({
    backgroundColor: 'rgb(121, 121, 121)',
    height: '100%',
});

const NavigationTitle = styled(Typography)({
    fontSize: '150%',
    fontWeight: 'bold',
    margin: 'auto',
    textAlign: 'center'
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