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

export default function Notes(props) {

    const { notebookTitle } = useParams();

    const [newNoteName, setNewNoteName] = useState('');
    const [notes, setNotes] = useState([]);

    const dispatch = useDispatch();
    const location = useLocation();
    const token = useSelector((state) => { return state.tokenState });
    const history = useHistory();
    const notebookID = location.state.notebookID;

    verifyToken(token, history);

    useEffect(() => {
        loadNotes();
    }, [notes]);

    const handleDialogButtonClick = () => {
        createNewNote(newNoteName);
    }

    const createNewNote = (noteName) => {
        const ajax = new CustomAjax();

        const data = {
            noteName: noteName,
            notebookID: notebookID
        }

        ajax.post('http://localhost:2727/api/notebooks/notes', data, true);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setNotes(response.notes);
        });
    }

    const loadNotes = () => {
        const ajax = new CustomAjax();

        ajax.get('http://localhost:2727/api/notebooks/notes', token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            const sameNotebookNotes = response.notes.filter((note) => {
                if (note.notebook_id === notebookID) {
                    return true;
                }

                return false;
            });

            if (notes.length < sameNotebookNotes.length) {
                setNotes(sameNotebookNotes);
            }
        });
    }

    // const parsePostgresDate = (postgresDate) => {
    //     return (new Date)
    // }

    const displayNotes = () => {
        return notes.map((note) => {
            return <SelectableNote
                notebookTitle={notebookTitle}
                dateEdited={note.date_edited}
                noteTitle={note.note_title}
                contents={note.note_contents}
                noteURL={createURL(note.note_title)}
                noteID={note.note_id}
            />
        });
    }

    dispatch(changeTitle(createTitle(notebookTitle)));
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