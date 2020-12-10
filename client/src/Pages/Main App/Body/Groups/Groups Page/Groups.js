import React, { useEffect } from 'react';
import { Avatar, Box, Button, Typography, styled } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import changeTitle from '../../../../../Redux/Actions/ChangeTitle';
import { setDrawer } from '../../../../../Redux/Actions/ChangeHeaderNavigation';

export default function Groups() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeTitle('Groups'));
        dispatch(setDrawer());
    });

    const displayGroups = () => {

    } 

    return (
        <div>
            <GroupButtonsSection>
                <GroupButton onClick={() => {history.push('/groups/create-group')}}>
                    Create
                </GroupButton>
                <GroupButton onClick={() => {history.push('/groups/join-group')}}>
                    Join
                </GroupButton>
            </GroupButtonsSection>

            <SelectableGroupsSection>

                {displayGroups()}
                
            </SelectableGroupsSection>
        </div>
    );
}

const GroupButtonsSection = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    height: '15%',
});

const GroupButton = styled(Button)({
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'rgb(191, 191, 191)'
    },
    fontWeight: 'bold',
    fontSize: '20px',
    flex: '1',
    padding: '2% 5%',
    margin: '20px',
});

const SelectableGroupsSection = styled(Box)({
    backgroundColor: 'black',
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
});