import React, { useEffect, useState } from 'react';
import { List, Box, styled, Dialog, DialogContent, Typography, DialogActions, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import CustomAjax from '../../../../CustomAjax';
import SelectableNotebook from './SelectableNotebook';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import { setDrawer } from '../../../../Redux/Actions/ChangeHeaderNavigation';
import FloatingActionButton from './FloatingActionButton';
import createURL from './Helper Functions/createURL';
import verifyToken from '../../Helper Functions/verifyToken';
import { useHistory } from 'react-router-dom';

export default function Notebooks() {

    const dispatch = useDispatch();
    const token = useSelector((state) => { return state.tokenState });
    const currentGroup = useSelector((state) => { return state.currentGroupState })
    const history = useHistory();

    verifyToken(token, history);

    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookName, setNewNotebookName] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    dispatch(changeTitle('Notebooks'));
    dispatch(setDrawer());

    useEffect(() => {
        loadNotebooks();
    }, [notebooks]);

    const loadNotebooks = () => {
        const ajax = new CustomAjax();

        ajax.get(`http://localhost:2727/api/notebooks/${currentGroup.id}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            if (notebooks.length < response.notebooks.length) {
                setNotebooks(response.notebooks);
            }
        });
    }

    const displayNotebooks = () => {
        return notebooks.map((notebook) => {
            const notebookURL = createURL(notebook.notebook_name);
            const notebookName = notebook.notebook_name;
            const notebookID = notebook.notebook_id;

            return <SelectableNotebook
                key={notebookID}
                title={notebookName}
                notebookURL={notebookURL}
                notebookID={notebookID}
            />
        });
    }

    const createNotebook = (notebookName) => {
        const ajax = new CustomAjax();

        if (currentGroup.id == undefined) {
            setOpenDialog(true);
        } else {
            const data = {
                notebookName: notebookName
            }

            ajax.post(`http://localhost:2727/api/notebooks/${currentGroup.id}`, data, true, token);
            ajax.stateListener((response) => {
                response = JSON.parse(response);

                setNotebooks(response.notebooks);
            });
        }
    }

    const handleDialogButtonClick = () => {
        createNotebook(newNotebookName);
        loadNotebooks();
    }

    return (
        <NotebooksPage>
            <List>

                {displayNotebooks()}

            </List>

            <Dialog open={openDialog} onClose={() => { setOpenDialog(false) }}>
                <BoldDialogTitle>
                    No Group Selected
                </BoldDialogTitle>

                <DialogContent>
                    Please select a group fom the Groups Page before creating a notebook.
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { setOpenDialog(false) }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <FloatingActionButton handleDialogButtonClick={handleDialogButtonClick} setNewName={setNewNotebookName} label='New Notebook' />
        </NotebooksPage>
    );
}

const NotebooksPage = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
});

const BoldDialogTitle = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '20px'
});