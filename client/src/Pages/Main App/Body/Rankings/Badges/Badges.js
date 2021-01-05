import { Box, styled, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import CustomAjax from '../../../../../CustomAjax';
import { setBackButton } from '../../../../../Redux/Actions/ChangeHeaderNavigation';
import changeTitle from '../../../../../Redux/Actions/ChangeTitle';
import LevelProgressBar from '../../../Header/NavigationMenu/LevelProgressBar';
import solveLevelUpRatio from '../../../Helper Functions/solveLevelUpRatio';
import verifyToken from '../../../Helper Functions/verifyToken';
import SelectableBadge from './SelectableBadge';

export default function Badges() {

    const ajax = new CustomAjax();

    const dispatch = useDispatch();
    const history = useHistory();

    const [badges, setBadges] = useState([]);

    const token = useSelector((state) => { return state.tokenState });
    const user = useSelector((state) => { return state.userState });

    useEffect(() => {
        verifyToken(token, history);
        getBadges();
    }, [history, token]);

    const getBadges = () => {
        ajax.get(`http://localhost:2727/api/badges`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setBadges(response.badges);
        });
    }

    const displayMilestoneBadges = () => {
        const milestoneBadges = badges.filter((badge) => {
            return badge.badge_type === 'MILESTONE';
        });

        return milestoneBadges.map((milestoneBadge) => {
            return (
                <SelectableBadge 
                    badge={milestoneBadge}
                />
            );
        });
    }

    const displaySpecialBadges = () => {
        const specialBadges = badges.filter((badge) => {
            return badge.badge_type === 'SPECIAL';
        });

        return specialBadges.map((specialBadge) => {
            return (
                <SelectableBadge 
                    badge={specialBadge}
                />
            );
        });
    }

    dispatch(changeTitle('My Badges'));
    dispatch(setBackButton());

    return (
        <BadgesPageBody>
            <LevelDisplay>
                Level {user.level} ({user.points} Pts)
            </LevelDisplay>
            <LevelProgressBar value={solveLevelUpRatio(user.levelPointsMin, user.levelPointsMax, user.points)}/>

            <BadgesSection>
                <BadgeSectionTitle>
                    Milestone Badges
                </BadgeSectionTitle>
                <BadgeList>
                    {displayMilestoneBadges()}
                </BadgeList>
            </BadgesSection>

            <BadgesSection>
                <BadgeSectionTitle>
                    Special Badges
                </BadgeSectionTitle>
                <BadgeList>
                    {displaySpecialBadges()}
                </BadgeList>
            </BadgesSection>
        </BadgesPageBody>
    );
}

const BadgesPageBody = styled(Box)({
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column'
});

const LevelDisplay = styled(Typography)({
    textAlign: 'center',
    fontSize: '40px',
    color: 'white',
    fontWeight: 'bold',
    margin: '40px 0px 20px 0px'
});

const BadgesSection = styled(Box)({
    display: 'flex',
    flexDirection: 'column'
});

const BadgeSectionTitle = styled(LevelDisplay)({
    margin: '40px 0px 0px 0px'
});

const BadgeList = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    overflow: 'auto',
});
