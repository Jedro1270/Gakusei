import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';

import BoldDialogAction from './Dialog Components/BoldDialogAction';
import BoldDialogTitle from './Dialog Components/BoldDialogTitle';

export default function IncompleteValuesDialog(props) {

    return (
            <Dialog open={props.openDialog}>
                <BoldDialogTitle
                    content='Incomplete Values'
                />

                <DialogContent>
                    Please make sure that you have filled up all the required values in the form.
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { 
                        props.setOpenDialog(false);
                    }}>
                        <BoldDialogAction
                            content='Close'
                        />
                    </Button>
                </DialogActions>
            </Dialog>
    );
}