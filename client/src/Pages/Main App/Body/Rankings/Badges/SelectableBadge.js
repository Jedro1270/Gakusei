import { Avatar, Box, Button, styled, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import createURL from '../../../Helper Functions/createURL';

export default function SelectableBadge(props) {

    const history = useHistory();

    return (
        <SelectableBadgeBody>
            <Button
                onClick={() => {
                    history.push(`/api/rankings/badges/${createURL(props.badgeName)}`)
                }}
            >
                <BadgeAvatar src={`/images/badge-icons/${props.badgeIcon}`}/>
            </Button>

            <BadgeTitle>
                {props.badgeName}
            </BadgeTitle>
        </SelectableBadgeBody>
    );
}

const SelectableBadgeBody = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    margin: '20px'
});

const BadgeTitle = styled(Typography)({
    color: 'white',
    textAlign: 'center'
});

const BadgeAvatar = styled(Avatar)({
    margin: '0px auto',
    height: '70px',
    width: '70px'
});