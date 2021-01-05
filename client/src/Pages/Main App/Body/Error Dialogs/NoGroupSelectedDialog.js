import { styled, Typography, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


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
                <BoldDialogTitle>
                    No Group Selected
                </BoldDialogTitle>

                <DialogContent>
                    Please select a group fom the Groups Page before accessing {props.page}.
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { 
                        setOpenDialog(false);
                        history.push('/api/groups');
                    }}>
                        <BoldDialogAction>
                            Close
                        </BoldDialogAction>
                    </Button>
                </DialogActions>
            </Dialog>
    );
}

const BoldDialogAction = styled(Typography)({
    fontWeight: 'bold'
});

const BoldDialogTitle = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '20px'
});