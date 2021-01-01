import React, { useState } from 'react';
import { Typography, Button, styled, Box } from '@material-ui/core';

import DeleteDialog from './Notebook Dialogs/DeleteDialog';
import RenameDialog from './Notebook Dialogs/RenameDialog';

export default function ActionButtons(props) {

    const [openRenameDialog, setOpenRenameDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    return (
        <ActionButtonsBody>

            <ActionButton onClick={() => { setOpenRenameDialog(true) }}>
                <ActionButtonText>
                    Rename
                </ActionButtonText>
            </ActionButton>

            <ActionButton onClick={() => { setOpenDeleteDialog(true) }}>
                <DeleteButtonText>
                    Delete
                </DeleteButtonText>
            </ActionButton>

            <DeleteDialog
                setOpenDialog={ setOpenDeleteDialog }
                openDialog={ openDeleteDialog }
                delete={ props.delete }
                label={ props.label }
                selectedTitle={ props.selectedTitle }
            />

            <RenameDialog
                setOpenDialog={ setOpenRenameDialog }
                openDialog={ openRenameDialog }
                rename={ props.rename }
                setNewTitle={ props.setNewTitle }
                label={ props.label }
                selectedTitle={ props.selectedTitle }
            />

        </ActionButtonsBody>
    );
}

const ActionButtonsBody = styled(Box)({
    marginLeft: 'auto',
    backgroundColor: 'grey',
    padding: '15px',
    margin: '10px 0px',
    display: 'flex',
    flex: '1'
});

const ActionButton = styled(Button)({
    margin: '5px',
    backgroundColor: 'lightgrey',
    '&:hover': {
        backgroundColor: 'darkgrey'
    },
    flex: '1'
});

const ActionButtonText = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '100%'
});

const DeleteButtonText = styled(ActionButtonText)({
    color: 'red'
});