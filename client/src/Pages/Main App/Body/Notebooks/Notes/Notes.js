import { List, Box, styled } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import CustomAjax from "../../../../../CustomAjax";
import { setBackButton } from "../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from '../../../../../Redux/Actions/ChangeTitle';
import FloatingActionButton from '../FloatingActionButton';
import SelectableNote from './SelectableNote';
import createURL from '../Helper Functions/createURL';
import createTitle from '../Helper Functions/createTitle';
import verifyToken from "../../../Helper Functions/verifyToken";

export default function Notes() {

    const [newNoteName, setNewNoteName] = useState('');
    const [notes, setNotes] = useState([]);

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const token = useSelector((state) => { return state.tokenState });
    const currentGroup = useSelector((state) => { return state.currentGroupState });

    const notebookID = location.state.notebookID;
    const notebookTitle = location.state.notebookTitle;

    useEffect(() => {
        verifyToken(token, history);
        loadNotes();
    }, [notes, history, token]);

    const handleDialogButtonClick = () => {
        createNewNote(newNoteName);
    }

    const createNewNote = (noteName) => {
        const ajax = new CustomAjax();

        const data = {
            noteName: noteName
        }

        ajax.post(`http://localhost:2727/api/notebooks/${currentGroup.id}/${notebookID}`, data, true, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setNotes(response.notes);
        });
    }

    const loadNotes = (changesMade) => {
        const ajax = new CustomAjax();

        ajax.get(`http://localhost:2727/api/notebooks/${currentGroup.id}/${notebookID}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            const sameNotebookNotes = response.notes.filter((note) => {
                if (note.notebook_id === notebookID) {
                    return true;
                }

                return false;
            });

            if (notes.length < sameNotebookNotes.length || changesMade) {
                setNotes(sameNotebookNotes);
            }
        });
    }

    // const parsePostgresDate = (postgresDate) => {
    //     return (new Date)
    // }

    const displayNotes = () => {
        return notes.map((note) => {

            const dateEdited = note.date_edited;
            const noteTitle = note.note_title;
            const noteURL = createURL(note.note_title);
            const noteID = note.note_id;

            return <SelectableNote
                key={ note.note_id }
                notebookTitle={ notebookTitle }
                notebookID={ notebookID }
                dateEdited={ dateEdited }
                noteTitle={ noteTitle }
                noteURL={ noteURL }
                noteID={ noteID }
                loadNotes={loadNotes}
            />
        });
    }

    dispatch(changeTitle(notebookTitle));
    dispatch(setBackButton());

    return (
        <NotesPage>
            <List>

                {displayNotes()}

            </List>

            <FloatingActionButton handleDialogButtonClick={handleDialogButtonClick} setNewName={setNewNoteName} label='New Note' />
        </NotesPage>
    );
}

const NotesPage = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
});