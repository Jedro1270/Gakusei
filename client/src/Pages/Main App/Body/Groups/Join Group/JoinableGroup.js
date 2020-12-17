import React, { useState } from 'react';
import { Avatar, Typography, styled, Button, Dialog, List, ListItem } from '@material-ui/core';
import CustomAjax from '../../../../../CustomAjax';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function JoinableGroup(props) {

    const [openDialog, setOpenDialog] = useState(false);

    const token = useSelector((state) => { return state.tokenState });
    const user = useSelector((state) => { return state.userState });
    const history = useHistory();

    const joinGroup = () => {
        const data = {
            groupId: props.groupId,
            userId: user.id
        }

        const ajax = new CustomAjax();

        ajax.post('http://localhost:2727/api/groups/join-group', data, true, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);
            if (response.message === 'Join Group Successful') {
                history.push('/api/groups');
            } else if (response.message === 'Group Already Joined') {
                alert('group joined already')
            }
        });
    }

    return (
        <div>
            <Button onClick={() => { setOpenDialog(true) }}>
                <GroupIcon src={`/images/group-icons/${props.groupImage}`} />
            </Button>

            <GroupName>
                {props.groupname}
            </GroupName>

            <Dialog open={openDialog} onClose={() => { setOpenDialog(false) }}>
                <List>
                    <ListItem button onClick={() => {joinGroup()}}>
                        <SelectGroupText>
                            Join Group
                        </SelectGroupText>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

const GroupIcon = styled(Avatar)({
    margin: '20px auto',
    height: '250px',
    width: '250px',
});

const GroupName = styled(Typography)({
    marginBottom: '50px',
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold'
});

const SelectGroupText = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold'
});