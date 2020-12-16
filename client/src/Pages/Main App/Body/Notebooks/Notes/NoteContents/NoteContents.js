import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Alert } from '@material-ui/lab';
import { Box, Button, styled, Typography } from "@material-ui/core";

import { setBackButton } from "../../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from "../../../../../../Redux/Actions/ChangeTitle";
import CustomAjax from '../../../../../../CustomAjax';
import createTitle from '../../Helper Functions/createTitle';
import verifyToken from "../../../../Helper Functions/verifyToken";

export default function NoteContents() {

    const { noteTitle } = useParams();
    const [contents, setContents] = useState('');
    const [noteSaved, setNoteSaved] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    const noteID = location.state.noteID;
    const token = useSelector((state) => { return state.tokenState });
    const history = useHistory();

    verifyToken(token, history);

    const updateNoteContents = (noteContents) => {
        const data = {
            contents: noteContents,
            noteID: noteID,
        }

        const ajax = new CustomAjax();

        ajax.put('http://localhost:2727/api/notebooks/notes/note-contents', data, true);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setContents(response.note.note_content);
        });
    }

    const getNoteContents = () => {
        const ajax = new CustomAjax();

        ajax.get('http://localhost:2727/api/notebooks/notes', token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            const currentNote = response.notes.filter((note) => {
                if (note.note_id === noteID) {
                    return true;
                }

                return false;
            })[0];

            const currentNoteContents = currentNote.note_content

            if (contents.length < currentNoteContents.length) {
                setContents(currentNoteContents);
            }
        });
    }

    useEffect(() => {
        getNoteContents();
    }, []);

    dispatch(changeTitle(createTitle(noteTitle)));
    dispatch(setBackButton());

    let noteSavedAlert = null;

    if (noteSaved) {
        noteSavedAlert = <Alert severity='success' onClose={() => { setNoteSaved(false) }}>Note Saved!</Alert>
    }

    return (
        <NoteContentsPage>
            {noteSavedAlert}
            <CKEditor
                editor={ClassicEditor}
                data={contents}
                onChange={(event, editor) => { setContents(editor.getData()) }}
            />
            <SaveButton>
                <SaveButtonText
                    onClick={() => {
                        updateNoteContents(contents);
                        setNoteSaved(true);
                    }}
                >
                    SAVE
               </SaveButtonText>
            </SaveButton>
        </NoteContentsPage>
    );
}

const SaveButton = styled(Button)({
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'lightgrey'
    },
    margin: '20px',
});

const SaveButtonText = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '25px'
});

const NoteContentsPage = styled(Box)({
    backgroundColor: 'black',
});