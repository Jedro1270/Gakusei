import { useEffect, useState } from 'react';
import { List, Box, styled } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomAjax from '../../../../CustomAjax';
import SelectableNotebook from './SelectableNotebook';
import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import { setDrawer } from '../../../../Redux/Actions/ChangeHeaderNavigation';
import FloatingActionButton from './FloatingActionButton';
import createURL from '../../Helper Functions/createURL';
import verifyToken from '../../Helper Functions/verifyToken';
import NoGroupSelectedDialog from '../Error Dialogs/NoGroupSelectedDialog';
import UndoAction from '../Snackbar Notifications/UndoAction';

export default function Notebooks() {

    const ajax = new CustomAjax();

    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector((state) => { return state.tokenState });
    const currentGroup = useSelector((state) => { return state.currentGroupState });

    verifyToken(token, history);

    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookName, setNewNotebookName] = useState('');
    const [previousNotebookId, setPreviousNotebookId] = useState('');
    const [renamedTitle, setRenamedTitle] = useState('');
    const [openUndoSnackbar, setOpenUndoSnackbar] = useState(false);

    dispatch(changeTitle(`Notebooks for ${currentGroup.groupname}`));
    dispatch(setDrawer());

    useEffect(() => {
        loadNotebooks();
    }, [notebooks]);

    const loadNotebooks = (changesMade) => {
        ajax.get(`http://localhost:2727/api/notebooks/${currentGroup.id}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            if (notebooks.length < response.notebooks.length || changesMade) {
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
                key={ notebookID }
                title={ notebookName }
                notebookURL={ notebookURL }
                notebookID={ notebookID }
                loadNotebooks={ loadNotebooks }
                renameNotebook={ renameNotebook }
                deleteNotebook={ deleteNotebook }
                setRenamedTitle={ setRenamedTitle }
            />
        });
    }

    const createNotebook = (notebookName) => {
        const data = {
            notebookName: notebookName
        }

        ajax.post(`http://localhost:2727/api/notebooks/${currentGroup.id}`, data, true, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setPreviousNotebookId(response.notebook.notebook_id);
            setOpenUndoSnackbar(true);
            loadNotebooks();
        });
    }

    const renameNotebook = (notebookId) => {
        const data = {
            title: renamedTitle
        }

        ajax.put(`http://localhost:2727/api/notebooks/${currentGroup.id}/${notebookId}`, data, true, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            loadNotebooks(true);
        });
    }

    const deleteNotebook = (notebookId) => {
        ajax.delete(`http://localhost:2727/api/notebooks/${currentGroup.id}/${notebookId}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            loadNotebooks(true);
        });
    }

    const handleDialogButtonClick = () => {
        createNotebook(newNotebookName);
    }

    const handleUndo = () => {
        deleteNotebook(previousNotebookId);
        setOpenUndoSnackbar(false);
    }

    return (
        <NotebooksPage>
            <NoGroupSelectedDialog
                page='Notebooks'
            />

            <List>

                { displayNotebooks() }

            </List>

            <FloatingActionButton 
                handleDialogButtonClick={ handleDialogButtonClick }
                setNewName={ setNewNotebookName }
                label='New Notebook'
            />

            <UndoAction
                openSnackbar={openUndoSnackbar}
                setOpenSnackbar={setOpenUndoSnackbar}
                message={'Notebook Created'}
                undo={handleUndo}
            />
        </NotebooksPage>
    );
}

const NotebooksPage = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
});