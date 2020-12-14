import React, { useEffect, useState } from 'react';
import { List, Box, styled } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import CustomAjax from '../../../../CustomAjax';
import SelectableNotebook from './SelectableNotebook';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import { setDrawer } from '../../../../Redux/Actions/ChangeHeaderNavigation';
import FloatingActionButton from './FloatingActionButton';

export default function Notebooks() {

    const dispatch = useDispatch();

    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookName, setNewNotebookName] = useState('');

    dispatch(changeTitle('Notebooks'));
    dispatch(setDrawer());

    useEffect(() => {
        loadNotebooks();
    }, [notebooks]);

    const loadNotebooks = () => {
        const ajax = new CustomAjax();

        ajax.get('http://localhost:2727/notebooks');
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            if (notebooks.length < response.notebooks.length) {
                setNotebooks(response.notebooks);
            }
        });
    }

    const createURL = (notebookName) => {
        return notebookName.replaceAll(' ', '-').toLowerCase();
    }

    const displayNotebooks = () => {
        return notebooks.map((notebook) => {
            const notebookURL = createURL(notebook.notebook_name);
            const notebookName = notebook.notebook_name;
            const notebookID = notebook.notebook_id;

            return <SelectableNotebook title={notebookName} notebookURL={notebookURL} notebookID={notebookID}/>
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

    const handleDialogButtonClick = () => {
        createNotebook(newNotebookName);
        loadNotebooks();
    }

    return (
        <NotebooksPage>
            <List>
            
                {displayNotebooks()}

            </List>

            <FloatingActionButton handleDialogButtonClick={handleDialogButtonClick} setNewName={setNewNotebookName} label='New Notebook'/>
        </NotebooksPage>
 
    );
}

const NotebooksPage = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
});