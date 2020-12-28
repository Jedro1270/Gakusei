import { styled, Typography, TextField, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

export default function RenameDialog(props) {

    return (
        <Dialog open={ props.openDialog } onClose={() => { props.setOpenDialog(false) }}>
            <DialogTitle>
                <FormTitle>
                    Rename { props.label }
                </FormTitle>
            </DialogTitle>

            <NameInput
                autoFocus
                label={`${props.label} Name`}
                onChange={(event) => { props.setNewTitle(event.target.value) }}
            />

            <DialogActions>
                <Button onClick={() => {
                    props.rename();
                    props.setOpenDialog(false);
                }}>
                    <CreateButtonText>
                        Rename
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