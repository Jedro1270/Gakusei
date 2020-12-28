import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Alert } from '@material-ui/lab';
import { Box, Button, styled, Typography } from "@material-ui/core";

import { setBackButton } from "../../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from "../../../../../../Redux/Actions/ChangeTitle";
import CustomAjax from '../../../../../../CustomAjax';
import verifyToken from "../../../../Helper Functions/verifyToken";

export default function NoteContents(props) {

    const [contents, setContents] = useState('');
    const [title, setTitle] = useState('');
    const [noteSaved, setNoteSaved] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const noteID = location.state.noteID;
    const notebookID = location.state.notebookID;

    const token = useSelector((state) => { return state.tokenState });
    const currentGroup = useSelector((state) => { return state.currentGroupState});

    const updateNoteContents = (noteContents) => {
        const data = {
            contents: noteContents
        }

        const ajax = new CustomAjax();

        ajax.put(`http://localhost:2727/api/notebooks/${currentGroup.id}/${notebookID}/${noteID}/contents`, data, true, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            setContents(response.note.note_content);
            setTitle(response.note.note_title);
        });
    }

    const getNoteContents = () => {
        const ajax = new CustomAjax();

        ajax.get(`http://localhost:2727/api/notebooks/${currentGroup.id}/${notebookID}/${noteID}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            const currentNoteContents = response.note.note_content;
            const currentNoteTitle = response.note.note_title;

            if (contents.length < currentNoteContents.length || title.length < currentNoteTitle.length) {
                setContents(currentNoteContents);
                setTitle(currentNoteTitle);
            }
        });
    }

    useEffect(() => {
        verifyToken(token, history);
        getNoteContents();
    }, [history, token]);

    dispatch(changeTitle(title));
    dispatch(setBackButton());

    let noteSavedAlert = null;

    if (noteSaved) {
        noteSavedAlert = <Alert severity='success' onClose={() => { setNoteSaved(false) }}>Note Saved!</Alert>
    }

    return (
        <NoteContentsPage>
            {noteSavedAlert}
            <CKEditor
                editor={ ClassicEditor }
                data={ contents }
                onChange={ (event, editor) => { setContents(editor.getData()) } }
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