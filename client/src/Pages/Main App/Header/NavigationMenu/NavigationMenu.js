import { List, ListItem, Avatar, Typography, styled, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import CustomAjax from '../../../../CustomAjax';
import setUser from '../../../../Redux/Actions/SetUserState';
import setToken from '../../../../Redux/Actions/SetTokenState';
import setCurrentGroup from '../../../../Redux/Actions/SetCurrentGroup';
import LevelProgressBar from './LevelProgressBar'
import solveLevelUpRatio from '../../Helper Functions/solveLevelUpRatio';

export default function NavigationMenu(props) {

    const ajax = new CustomAjax();

    const user = useSelector((state) => { return state.userState });
    const token = useSelector((state) => { return state.tokenState });
    const header = useSelector((state) => { return state.headerTitle });

    const [file, setFile] = useState(null);
    const [temporaryFile, setTemporaryFile] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const changeProfilePicture = () => {
        const formData = new FormData();

        formData.append('file', file);

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

    const updateUserState = () => {
        ajax.get('http://localhost:2727/api/users', token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            const updatedUser = {
                id: response.user.user_id,
                username: response.user.username,
                profilePicture: response.user.profile_picture,
                points: response.user.points,
                level: response.user.level_id,
                levelPointsMax: response.user.maximum_points,
                levelPointsMin: response.user.minimum_points
            }

            dispatch(setUser(updatedUser));
        });
    }

    useEffect(() => {
        if (!props.openDrawer && file !== null) {
            changeProfilePicture();
        }
    }, [props.openDrawer]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            updateUserState();
        }, 1000);

        return () => clearInterval(interval);
    }, [user]);

    return (
        <NavigationList>

            <UserAvatar 
                src={temporaryFile !== null ? temporaryFile : `/images/profile-pictures/${user.profilePicture}`}
            />

            <ChangeProfilePictureButton component='label'>
                Change Profile Picture

                <input type='file' accept='image/*' hidden onChange={(event) => {
                    const chosenFile = event.target.files[0];

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

            <LevelProgressBar value={solveLevelUpRatio(user.levelPointsMin, user.levelPointsMax, user.points)} /> 

            <CustomLink to='/api/groups' >
                <NavigationContainer 
                    button
                    selected={header === 'Groups'}
                >
                    <NavigationTitle>
                        Groups
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/pomodoro' >
                <NavigationContainer 
                    button
                    selected={header === 'Pomodoro'}
                >
                    <NavigationTitle>
                        Pomodoro
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/notebooks' >
                <NavigationContainer 
                    button
                    selected={header === 'Notebooks'}
                >
                    <NavigationTitle>
                        Notebooks
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/chat' >
                <NavigationContainer 
                    button
                    selected={header === 'Chat'}
                >
                    <NavigationTitle>
                        Chat
                    </NavigationTitle>
                </NavigationContainer>
            </CustomLink>

            <CustomLink to='/api/rankings' >
                <NavigationContainer 
                    button
                    selected={header === 'Rankings and Badges'}
                >
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
    height: '100%',
});

const NavigationList = styled(List)({
    backgroundColor: 'rgb(153, 153, 153)',
    display: 'flex',
    flexDirection: 'column',
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
    margin: '0px auto',
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
    margin: '20px',
    fontWeight: 'bold'
});