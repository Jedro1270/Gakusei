import { Button, Snackbar } from '@material-ui/core';

export default function UndoAction(props) {
    return (
        <Snackbar
            open={props.openSnackbar}
            onClose={() => {props.setOpenSnackbar(false)}}
            message={props.message}
            autoHideDuration={6000}
            action={
                <Button 
                    color="inherit"
                    size="small"
                    onClick={props.undo}
                >
                    Undo
                </Button>
            }
        />
    );
}