import { Fab, styled, Typography, TextField, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { useState } from 'react';
import { Add } from '@material-ui/icons';

export default function FloatingActionButton(props) {

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div>
            <ActionButton size='large' onClick={() => {setOpenDialog(true)}}>
                <Add/>
            </ActionButton>

            <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}>
                <DialogTitle>
                        <FormTitle>
                            Create {props.label}
                        </FormTitle>
                </DialogTitle>
                
                <NoteBookNameInput
                    autoFocus
                    label={`${props.label} Name`}
                    onChange={(event) => {props.setNewName(event.target.value)}}
                />

                <DialogActions>
                    <Button onClick={() => {
                        props.handleDialogButtonClick();
                        setOpenDialog(false);
                    }}>
                        <CreateButtonText>
                            Create
                        </CreateButtonText>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const ActionButton = styled(Fab)({
    position: 'fixed',
    right: '20px',
    bottom: '20px'
});

const FormTitle = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold'
});

const NoteBookNameInput = styled(TextField)({
    margin: '0px 20px 20px 20px',
});

const CreateButtonText = styled(Typography)({
    fontWeight: 'bold'
});