import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Typography, styled } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import changeTitle from '../../../../../Redux/Actions/ChangeTitle';
import { setDrawer } from '../../../../../Redux/Actions/ChangeHeaderNavigation';
import CustomAjax from '../../../../../CustomAjax';
import SelectableGroup from './Selectable Group/SelectableGroup';

export default function Groups() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        dispatch(changeTitle('Groups'));
        dispatch(setDrawer());
        initializeGroups();
    });

    const initializeGroups = () => {
        const ajax = new CustomAjax();

        ajax.get('http://localhost:2727/groups');
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setGroups(response.groups);
        });
    }

    const displayGroups = () => {
        return groups.map((group) => {
            return (
                <SelectableGroup groupname={group.group_name} groupImage={group.group_picture}/>
            );
        });
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