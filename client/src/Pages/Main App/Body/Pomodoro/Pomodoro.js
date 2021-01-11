import { Box, Typography, Button, styled } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomAjax from '../../../../CustomAjax';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import verifyToken from '../../Helper Functions/verifyToken';
import BadgeEarned from '../Snackbar Notifications/BadgeEarned';

export default function Pomodoro() {

    const ajax = new CustomAjax();

    const dispatch = useDispatch();

    const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(1500);
    const [timerStart, setTimerStart] = useState(false);
    const [restPeriod, setRestPeriod] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [badgeTitle, setBadgeTitle] = useState('');

    const token = useSelector((state) => { return state.tokenState });

    const history = useHistory();

    const recordPomodoro = () => {
        const data = {
            pomodoroAmount: 1
        }

        ajax.post(`http://localhost:2727/api/pomodoro`, data, true, token);
        getPomodorosCompleted();
    }

    const getPomodorosCompleted = () => {
        ajax.get(`http://localhost:2727/api/pomodoro`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setPomodorosCompleted(response.pomodoros.length);

            if (response.badgeTitle.length > 0) {
                setBadgeTitle(response.badgeTitle);
                setOpenSnackbar(true);
            }
        });
    }

    dispatch(changeTitle('Pomodoro'));
    verifyToken(token, history);

    useEffect(() => {
        if (secondsLeft > 0 && timerStart) {
            setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        } else if (!timerStart) {
            if (restPeriod) {
                setSecondsLeft(1);
            } else {
                setSecondsLeft(2);
            }
        } else if (secondsLeft <= 0) {
            if (!restPeriod) {
                recordPomodoro();
                setPomodorosCompleted(pomodorosCompleted + 1);
            }

            setRestPeriod(!restPeriod);
        }
    }, [secondsLeft, timerStart, history, token]);

    useEffect(() => {
        getPomodorosCompleted();
    }, []);

    const displayTimerType = () => {
        if (restPeriod) {
            return <TimerType>Enjoy Your Break!</TimerType>
        } else {
            return <TimerType>Time for Work!</TimerType>
        }
    }

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

            <BadgeEarned
                openSnackbar={openSnackbar}
                setOpenSnackbar={setOpenSnackbar}
                badgeTitle={badgeTitle}
            />

            <PomodoroCounter>
                Pomodoros Completed: {pomodorosCompleted}
            </PomodoroCounter>

            {displayTimerType()}

            {displayTimer()}

            {displayToggleButton()}
        </PomodoroBody>
    );
}

const PomodoroBody = styled(Box)({
    textAlign: 'center',
    color: 'white'
});

const PomodoroCounter = styled(Typography)({
    marginTop: '10%',
    fontSize: '25px',
    fontWeight: 'bold'
});

const TimerType = styled(Typography)({
    fontWeight: 'bold',
    margin: '30px',
    fontSize: '40px'
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