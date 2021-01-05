import { Avatar, Box, styled, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import { setBackButton } from '../../../../../../Redux/Actions/ChangeHeaderNavigation';
import changeTitle from '../../../../../../Redux/Actions/ChangeTitle';
import verifyToken from '../../../../Helper Functions/verifyToken';

export default function BadgeDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const badgeName = location.state.badge.badge_name;
    const badgeIcon = location.state.badge.badge_icon;
    const badgeDescription = location.state.badge.badge_description;
    const poinstValue = location.state.badge.points_value;

    const token = useSelector((state) => { return state.tokenState });

    useEffect(() => {
        verifyToken(token, history);
    }, [history, token]);

    dispatch(changeTitle(''));
    dispatch(setBackButton());

    return (
        <BadgeDetailsPageBody>
           <BadgeDetailsAvatar src={`/images/badge-icons/${badgeIcon}`}/>

           <BadgeTitle>
               {badgeName}
           </BadgeTitle>

           <BadgeDescriptiveText>
               ({poinstValue} Pts)
           </BadgeDescriptiveText>

           <BadgeDescriptiveText>
               {badgeDescription}
           </BadgeDescriptiveText>
        </BadgeDetailsPageBody>
    );
}

const BadgeDetailsPageBody = styled(Box)({
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
});

const BadgeDetailsAvatar = styled(Avatar)({
    height: '250px',
    width: '250px',
    margin: '20px auto 10px auto'
});

const BadgeTitle = styled(Typography)({
    color: 'white',
    fontSize: '35px',
    fontWeight: 'bold',
    margin: '10px'
});

const BadgeDescriptiveText = styled(BadgeTitle)({
    fontSize: '30px',
    fontWeight: 'normal'
});