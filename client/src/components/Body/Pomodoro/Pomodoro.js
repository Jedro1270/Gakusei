import { Avatar, Box, Typography, Button, styled } from '@material-ui/core';
import React, { useEffect } from 'react';

export default function Pomodoro(props) {

    useEffect(() => {
        props.setTitle('Pomodoro');
    });

    return (
        <PomodoroBody>
            <PomodoroMembersSection>

                <Member>
                    <OfflineStatusIndicator/>
                    Groupmate Name
                </Member>

                <Member>
                    <OnlineStatusIndicator/>
                    Groupmate Name
                </Member>

                <Member>
                    <OnlineStatusIndicator/>
                    Groupmate Name
                </Member>

                <Member>
                    <OnlineStatusIndicator/>
                    Groupmate Name
                </Member>

            </PomodoroMembersSection>

            <PomodoroCounter>
                Pomodoros Finished: 5         
            </PomodoroCounter>

            <PomodoroTimer>
                25:00
            </PomodoroTimer>

            <StartButton>    
                START
            </StartButton>
        </PomodoroBody>
    );
}

const PomodoroBody = styled(Box)({
    textAlign: 'center',
    color: 'white'
});

const PomodoroMembersSection = styled(Box)({
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Member = styled(Box)({
    margin: '5px',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '20px',
    fontWeight: 'bold',
});

const OfflineStatusIndicator = styled(Avatar)({
    height: '25px',
    width: '25px',
    marginRight: '10px',
    backgroundColor: 'red',
    color: 'red'
});

const OnlineStatusIndicator = styled(Avatar)({
    height: '25px',
    width: '25px',
    marginRight: '10px',
    backgroundColor: 'rgb(51, 204, 51)',
    color: 'rgb(51, 204, 51)'
});
  
const PomodoroCounter = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold'
});

const PomodoroTimer = styled(Typography)({
    fontSize: '100px',
    margin: '30px',
    fontWeight: 'bold'
});

const StartButton = styled(Button)({
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'rgb(191, 191, 191)'
    },
    fontWeight: 'bold',
    fontSize: '20px',
    flex: '1',
    width: '200px',
    height: '50px',
    margin: '20px',
});