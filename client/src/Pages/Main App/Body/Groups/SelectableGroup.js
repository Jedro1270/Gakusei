import React, { useEffect, useState } from 'react';
import { Avatar, Typography, styled, Button, Dialog, List, ListItem, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import setCurrentGroup from '../../../../Redux/Actions/SetCurrentGroup';
import ConditionalWrapper from '../../Helper Components/ConditionalWrapper';
import CustomAjax from '../../../../CustomAjax';

export default function SelectableGroup(props) {

    const [openDialog, setOpenDialog] = useState(false);
    const [selected, setSelected] = useState(false);

    const dispatch = useDispatch();
    const currentGroup = useSelector((state) => { return state.currentGroupState });
    const token = useSelector((state) => { return state.tokenState });

    const group = {
        id: props.groupId,
        groupname: props.groupname,
    }

    const displayBody = () => {
        if (currentGroup.id === props.groupId) {
            setSelected(true);
        } else {
            setSelected(false);  
        }
    }

    const selectGroup = () => {
        if (selected) {
            dispatch(setCurrentGroup({}));
            setSelected(false);
        } else {
            dispatch(setCurrentGroup(group));
            setSelected(true);
        }
    }

    const leaveGroup = () => {

        const ajax = new CustomAjax();

        ajax.delete(`http://localhost:2727/api/groups/${props.groupId}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            if (response.message === 'Delete Group Successful') {
                dispatch(setCurrentGroup({}));
            }
        });
    }

    useEffect(() => {
        displayBody();
    }, [currentGroup]);

    return (
        <ConditionalWrapper
            condition={selected}
            wrapper={(children) => {
                return <SelectedGroupBody>{children}</SelectedGroupBody>
            }}
        >
            <Button onClick={() => { setOpenDialog(true) }}>
                <GroupIcon src={`/images/group-icons/${props.groupImage}`} />
            </Button>

            <GroupName>
                {props.groupname}
            </GroupName>

            <Dialog open={openDialog} onClose={() => { setOpenDialog(false) }}>
                <List>
                    <ListItem button onClick={() => {
                        selectGroup();
                        setOpenDialog(false);
                    }}>
                        <SelectGroupText>
                            Select Group
                        </SelectGroupText>
                    </ListItem>
                    <ListItem button onClick={() => {
                        leaveGroup();
                        setOpenDialog(false);
                        dispatch(setCurrentGroup({}));
                    }}>
                        <LeaveGroupText>
                            Leave Group
                        </LeaveGroupText>
                    </ListItem>
                </List>
            </Dialog>
        </ConditionalWrapper>
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

const LeaveGroupText = styled(SelectGroupText)({
    color: 'red'
});

const SelectedGroupBody = styled(Box)({
    margin: '10px',
    borderRadius: '20px',
    backgroundColor: 'grey'
});