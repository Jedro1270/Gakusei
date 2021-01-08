import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import BoldDialogAction from './Dialog Components/BoldDialogAction';
import BoldDialogTitle from './Dialog Components/BoldDialogTitle';

export default function NoGroupSelectedDialog(props) {

    const [openDialog, setOpenDialog] = useState(false);

    const history = useHistory();

    const currentGroup = useSelector((state) => { return state.currentGroupState });

    useEffect(() => {
        if (currentGroup.id == null) {
            setOpenDialog(true);
        }
    }, []);

    return (
            <Dialog open={openDialog}>
                <BoldDialogTitle
                    content='No Group Selected'
                />

                <DialogContent>
                    Please select a group fom the Groups Page before accessing {props.page}.
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { 
                        setOpenDialog(false);
                        history.push('/api/groups');
                    }}>
                        <BoldDialogAction
                            content='Close'
                        />
                    </Button>
                </DialogActions>
            </Dialog>
    );
}