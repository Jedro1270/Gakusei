import {styled, Typography, TextField, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

export default function CreateDialog(props) {

    return (
        <Dialog open={ props.openDialog } onClose={() => { props.setOpenDialog(false) }}>
            <DialogTitle>
                <FormTitle>
                    Create { props.label }
                </FormTitle>
            </DialogTitle>

            <NameInput
                autoFocus
                label={`${props.label} Name`}
                onChange={(event) => { props.setNewName(event.target.value) }}
            />

            <DialogActions>
                <Button onClick={() => {
                    props.create();
                    props.setOpenDialog(false);
                }}>
                    <CreateButtonText>
                        Create
                    </CreateButtonText>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const FormTitle = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold'
});

const NameInput = styled(TextField)({
    margin: '0px 20px 20px 20px',
});

const CreateButtonText = styled(Typography)({
    fontWeight: 'bold'
});