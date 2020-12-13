import React, { useEffect, useState } from 'react';
import { List, Dialog, Typography, styled, Fab, DialogTitle, TextField, DialogActions, Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Add } from '@material-ui/icons';

import CustomAjax from '../../../../CustomAjax';
import SelectableNotebook from './SelectableNotebook';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import { setDrawer } from '../../../../Redux/Actions/ChangeHeaderNavigation';

export default function Notebooks() {

    const dispatch = useDispatch();

    const [notebooks, setNotebooks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newNotebookName, setNewNotebookName] = useState('')

    dispatch(changeTitle('Notebooks'));
    dispatch(setDrawer());

    useEffect(() => {
        loadNotebooks();
    }, [openDialog]);

    const loadNotebooks = () => {
        const ajax = new CustomAjax();

        ajax.get('http://localhost:2727/notebooks');
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setNotebooks(response.notebooks);
        });
    }

    const createNotebookURL = (notebookName) => {
        return notebookName.replaceAll(' ', '-').toLowerCase();
    }

    const displayNotebooks = () => {
        return notebooks.map((notebook) => {
            const notebookURL = createNotebookURL(notebook.notebook_name);
            const notebookName = notebook.notebook_name;

            return <SelectableNotebook title={notebookName} notebookURL={notebookURL}/>
        });
    }

    const createNotebook = (notebookName) => {
        const ajax = new CustomAjax();

        const data = {
            notebookName: notebookName
        }

        ajax.post('http://localhost:2727/notebooks', data, true);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setNotebooks(response.notebooks);
        });
    }

    return (
        <NotebooksPage>
            <List>
            
                {displayNotebooks()}

            </List>

            <FloatingActionButton size='large' onClick={() => {setOpenDialog(true)}}>
                <Add/>
            </FloatingActionButton>

            <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}>
                <DialogTitle>
                        <FormTitle>
                            Create Notebook 
                        </FormTitle>
                </DialogTitle>
                
                <NoteBookNameInput
                    autoFocus
                    label='Notebook Name'
                    onChange={(event) => {setNewNotebookName(event.target.value)}}
                />

                <DialogActions>
                    <Button onClick={() => {
                        createNotebook(newNotebookName);
                        setOpenDialog(false);
                        loadNotebooks();
                    }}>
                        <CreateButtonText>
                            Create
                        </CreateButtonText>
                    </Button>
                </DialogActions>
            </Dialog>
        </NotebooksPage>
 
    );
}

const FloatingActionButton = styled(Fab)({
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

const NotebooksPage = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
});