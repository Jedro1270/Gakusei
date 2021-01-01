import { Avatar, Box, Typography, Button, styled } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import verifyToken from '../../Helper Functions/verifyToken';

export default function Pomodoro() {

    const dispatch = useDispatch();

    const [secondsLeft, setSecondsLeft] = useState(1500);
    const [timerStart, setTimerStart] = useState(false);

    const token = useSelector((state) => { return state.tokenState });
    const history = useHistory();

    dispatch(changeTitle('Pomodoro'));
    verifyToken(token, history);

    useEffect(() => {
        if (secondsLeft > 0 && timerStart) {
            setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        } else if (!timerStart) {
            setSecondsLeft(1500)
        } else if (secondsLeft <= 0) {
            // add pomodoro
        }
    }, [secondsLeft, timerStart, history, token]);

    const displayTimer = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft - (minutes * 60);

        return (
            <PomodoroTimer>
                {minutes > 9 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`}
            </PomodoroTimer>
        )
    }

    const displayToggleButton = () => {
        if (timerStart) {
            return (
                <ToggleButton onClick={() => { setTimerStart(false) }}>
                    RESET
                </ToggleButton>
            )
        } else {
            return (
                <ToggleButton onClick={() => { setTimerStart(true) }}>
                    START
                </ToggleButton>
            )
        }
    }

    return (
        <PomodoroBody>
            <PomodoroMembersSection>

                <Member>
                    <OfflineStatusIndicator />
                    Groupmate Name
                </Member>

                <Member>
                    <OnlineStatusIndicator />
                    Groupmate Name
                </Member>

                <Member>
                    <OnlineStatusIndicator />
                    Groupmate Name
                </Member>

                <Member>
                    <OnlineStatusIndicator />
                    Groupmate Name
                </Member>

            </PomodoroMembersSection>

            <PomodoroCounter>
                Pomodoros Finished: 5
            </PomodoroCounter>

            {displayTimer()}

            {displayToggleButton()}
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

const ToggleButton = styled(Button)({
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