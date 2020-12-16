import React, { useState } from 'react';
import { Avatar, Typography, styled, Button, Dialog, List, ListItem } from '@material-ui/core';

export default function JoinableGroup(props) {

    const [openDialog, setOpenDialog] = useState(false);

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
                    <ListItem button>
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