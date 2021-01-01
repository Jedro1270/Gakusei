import { List, ListItem, Avatar, Typography, styled, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import CustomAjax from '../../../../CustomAjax';
import setUser from '../../../../Redux/Actions/SetUserState';
import setToken from '../../../../Redux/Actions/SetTokenState';
import setCurrentGroup from '../../../../Redux/Actions/SetCurrentGroup';

import LevelProgressBar from './LevelProgressBar'

export default function NavigationMenu(props) {

    const user = useSelector((state) => { return state.userState });
    const token = useSelector((state) => { return state.tokenState });

    const [file, setFile] = useState(null);
    const [temporaryFile, setTemporaryFile] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const changeProfilePicture = () => {
        const formData = new FormData();

        formData.append('file', file);

        const ajax = new CustomAjax();

        ajax.put('http://localhost:2727/api/users', formData, false, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            const updatedUser = {
                id: response.user.user_id,
                username: response.user.username,
                profilePicture: response.user.profile_picture,
                points: response.user.points,
                level: response.user.level_id
            }

            dispatch(setUser(updatedUser));
        });
    }

    useEffect(() => {
        if (!props.openDrawer && file !== null) {
            changeProfilePicture();
        }
    }, [props.openDrawer]);

    return (
        <NavigationList>

            <UserAvatar 
                src={temporaryFile !== null ? temporaryFile : `/images/profile-pictures/${user.profilePicture}`}
            />

            <ChangeProfilePictureButton component='label'>
                Change Profile Picture

                <input type='file' accept='image/*' hidden onChange={(event) => {
                    event.preventDefault()
                    const chosenFile = event.target.files[0]

                    setFile(chosenFile);
                    setTemporaryFile(URL.createObjectURL(chosenFile));
                }} />
            </ChangeProfilePictureButton>

            <UsernameDisplay>
                {user.username}
            </UsernameDisplay>

            <LevelDisplay>
                Level {user.level} ({user.points} Pts)
            </LevelDisplay>

            <LevelProgressBar value={user.points} />

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

            <LogoutButton onClick={() => {
                dispatch(setToken({}));
                dispatch(setUser({}));
                dispatch(setCurrentGroup({}));
                history.push('/')
            }}>
                Log Out
            </LogoutButton>
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

const ChangeProfilePictureButton = styled(Button)({
    margin: '0px 19%',
    padding: '10px',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'rgb(191, 191, 191)'
    },
    borderRadius: '10px'
});

const UsernameDisplay = styled(Typography)({
    textAlign: 'center',
    margin: '20px',
    fontSize: '30px',
    color: 'white'
});

const LevelDisplay = styled(Typography)({
    textAlign: 'center',
    fontSize: '35px',
    color: 'white',
    fontWeight: 'bold'
});

const LogoutButton = styled(ChangeProfilePictureButton)({
    margin: '0px 33%',
    fontWeight: 'bold'
});