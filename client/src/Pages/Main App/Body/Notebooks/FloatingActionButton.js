import { Box, Fab, styled } from '@material-ui/core';
import { useState } from 'react';
import { Add } from '@material-ui/icons';

import CreateDialog from './Notebook Dialogs/CreateDialog';

export default function FloatingActionButton(props) {

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Box>
            <ActionButton size='large' onClick={() => { setOpenDialog(true) }}>
                <Add />
            </ActionButton>

            <CreateDialog 
                openDialog={ openDialog }
                setOpenDialog={ setOpenDialog }
                label={ props.label }
                setNewName={ props.setNewName }
                create={ props.handleDialogButtonClick }
            />
        </Box>
    )
}

const ActionButton = styled(Fab)({
    position: 'fixed',
    right: '20px',
    bottom: '20px'
});