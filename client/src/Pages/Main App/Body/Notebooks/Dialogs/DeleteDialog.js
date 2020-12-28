import {styled, Typography, Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@material-ui/core';

export default function DeleteDialog(props) {

    return (
        <Dialog open={ props.openDialog } onClose={() => { props.setOpenDialog(false) }}>
            <DialogTitle>
                <FormTitle>
                    Delete { props.label }
                </FormTitle>
            </DialogTitle>

            <DialogContent>
                Are you sure you want to delete { props.selectedTitle }?
            </DialogContent>

            <DialogActions>
                <Button onClick={() => {
                    props.setOpenDialog(false);
                }}>
                    <ButtonText>
                        Cancel
                    </ButtonText>
                </Button>

                <Button onClick={() => {
                    props.delete();
                    props.setOpenDialog(false);
                }}>
                    <DeleteButtonText>
                        Delete
                    </DeleteButtonText>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const FormTitle = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold'
});

const ButtonText = styled(Typography)({
    fontWeight: 'bold'
});

const DeleteButtonText = styled(ButtonText)({
    color: 'red'
});