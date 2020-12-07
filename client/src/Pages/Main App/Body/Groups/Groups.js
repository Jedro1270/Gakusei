import React, { useEffect } from 'react';
import { Avatar, Box, Button, Typography, styled } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Groups(props) {

    const history = useHistory();

    useEffect(() => {
        props.setTitle('Groups');
        props.setBackButtonNav(false);
    });

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

                    <GroupIcon src='/images/group-icons/image.png'>
                    </GroupIcon>
                    <GroupName>
                        Group Name
                    </GroupName>

                    <GroupIcon src='/images/group-icons/image.png'>
                    </GroupIcon>
                    <GroupName>
                        Group Name
                    </GroupName>
     
                    <GroupIcon src='/images/group-icons/image.png'>
                    </GroupIcon>
                    <GroupName>
                        Group Name
                    </GroupName>
                
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

const GroupIcon = styled(Avatar)({
    margin: '20px auto',
    height: '250px',
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
});

const GroupName = styled(Typography)({
    marginBottom: '50px',
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold'
});