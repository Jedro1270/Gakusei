import { Box, Button, styled, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomAjax from '../../../../CustomAjax';
import { setDrawer } from '../../../../Redux/Actions/ChangeHeaderNavigation';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import verifyToken from '../../Helper Functions/verifyToken';
import MemberRanking from './MemberRanking';

export default function Rankings() {

    const dispatch = useDispatch();

    const ajax = new CustomAjax();

    const [teamMembers, setTeamMembers] = useState([]);

    const token = useSelector((state) => { return state.tokenState });
    const currentGroup = useSelector((state) => { return state.currentGroupState })

    const history = useHistory();

    useEffect(() => {
        verifyToken(token, history);
        getTeamMembers();
    }, [token, history]);

    const getTeamMembers = () => {
        ajax.get(`http://localhost:2727/api/rankings/${currentGroup.id}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setTeamMembers(response.members);
        });
    }

    const displayTeamMembers = () => {
        return teamMembers.map((member, index) => {
            const username = member.username;
            const level = member.level_id;
            const rankingNumber = index + 1;
            const points = member.points;

            return (
                <MemberRanking
                    username={username}
                    rankingNumber={rankingNumber}
                    level={level}
                    points={points}
                />
            );
        });
    }

    dispatch(changeTitle('Rankings and Badges'));
    dispatch(setDrawer());

    return (
        <RankingsBody>
            <GroupButton
                onClick={() => {
                    history.push('/api/rankings/badges')
                }}
            >
                My Badges
            </GroupButton>

            <TeamLeaderboardHeader>
                Team Leaderboard
            </TeamLeaderboardHeader>

            <TeamLeaderboardList>
                {displayTeamMembers()}
            </TeamLeaderboardList>
        </RankingsBody>
    );
}

const RankingsBody = styled(Box)({
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    height: '80%'
});

const GroupButton = styled(Button)({
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'rgb(191, 191, 191)'
    },
    fontWeight: 'bold',
    fontSize: '40px',
    padding: '2% 5%',
    margin: '20px auto'
});

const TeamLeaderboardHeader = styled(Typography)({
    fontSize: '40px',
    color: 'white',
    textAlign: 'center',
    margin: '20px',
    fontWeight: 'bold '
});

const TeamLeaderboardList = styled(Box)({
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
});