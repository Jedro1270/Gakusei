import React, { useEffect, useState } from 'react';
import { Avatar, Typography, styled, Button, Dialog, List, ListItem } from '@material-ui/core';

export default function SelectableGroup(props) {

    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setGroupName(props.groupname);
        setGroupImage(props.groupImage)
    });

    return (
        <div>
            <Button onClick={() => {setOpenDialog(true)}}>
                <GroupIcon src={`/images/group-icons/${groupImage}`}/>
            </Button>

            <GroupName>
                {groupName}
            </GroupName>

            <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}>
                <List>
                    <ListItem button>
                        <SelectGroupText>
                            Select Group
                        </SelectGroupText>
                    </ListItem>
                    <ListItem button>
                        <LeaveGroupText>
                            Leave Group
                        </LeaveGroupText>
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

const LeaveGroupText = styled(SelectGroupText)({
    color: 'red'
});