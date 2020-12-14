import { List, Box, styled } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import CustomAjax from "../../../../../CustomAjax";
import { setBackButton } from "../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from '../../../../../Redux/Actions/ChangeTitle';
import FloatingActionButton from '../FloatingActionButton';
import SelectableNote from './SelectableNote';

export default function Notes(props) {

    const { notebookTitle } = useParams();

    const [newNoteName, setNewNoteName] = useState('');
    const [notes, setNotes] = useState([]);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        loadNotes();
    }, [notes]);

    const createTitle = (notebookURL) => {
        return notebookURL
                        .replaceAll('-', ' ')
                        .split(' ')
                        .map((word) => {
                            const firstLetter = word[0].toUpperCase();
                            return `${firstLetter}${word.slice(1)} `
                        });
    }

    const createURL = (noteName) => {
        return noteName.replaceAll(' ', '-').toLowerCase();
    }

    const handleDialogButtonClick = () => {
        createNewNote(newNoteName);
    }

    const createNewNote = (noteName) => {
        const ajax = new CustomAjax();

        const data = {
            noteName: noteName,
            notebookID: location.state.notebookID
        }

        ajax.post('http://localhost:2727/notebooks/notes', data, true);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setNotes(response.notes);
        });
    }

    const loadNotes = () => {
        const ajax = new CustomAjax();

        ajax.get('http://localhost:2727/notebooks/notes');
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            if (notes.length < response.notes.length) {
                setNotes(response.notes);
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

            <FloatingActionButton handleDialogButtonClick={handleDialogButtonClick} setNewName={setNewNoteName} label='New Note'/>
        </NotesPage>
    );
}

const NotesPage = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black'
});