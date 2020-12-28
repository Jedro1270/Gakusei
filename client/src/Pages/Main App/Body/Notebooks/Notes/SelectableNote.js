import { ListItem, Typography, styled, Box } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomAjax from "../../../../../CustomAjax";
import ActionButtons from "../ActionButtons";

export default function Notes(props) {

    const currentGroup = useSelector((state) => { return state.currentGroupState });
    const token = useSelector((state) => { return state.tokenState });
    const ajax = new CustomAjax();

    const [newTitle, setNewTitle] = useState('');

    const renameNote = () => {
        const data = {
            title: newTitle
        }

        ajax.put(`http://localhost:2727/api/notebooks/${currentGroup.id}/${props.notebookID}/${props.noteID}`, data, true, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            props.loadNotes(true);
        });
    }

    const deleteNote = () => {
        ajax.delete(`http://localhost:2727/api/notebooks/${currentGroup.id}/${props.notebookID}/${props.noteID}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            props.loadNotes(true);
        });
    }

    return (
        <SelectableNoteBody>
            <CustomLink to={{ pathname: `/api/notebooks/${props.notebookTitle}/${props.noteURL}`, state: { noteID: props.noteID, notebookID: props.notebookID } }}>
                <Note button>
                    <DateText>
                        {props.dateEdited}
                    </DateText>

                    <NoteTitle>
                        {props.noteTitle}
                    </NoteTitle>

                </Note>
            </CustomLink>

            <ActionButtons 
                setNewTitle={ setNewTitle }
                rename={ renameNote }
                delete={ deleteNote }
                label={ 'Note' }
                selectedTitle={ props.noteTitle }
            />
        </SelectableNoteBody>
    );
}

const SelectableNoteBody = styled(Box)({
    display: 'flex',
    flexDirection: 'row'
});

const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: 'white',
    flex: '3'
});

const Note = styled(ListItem)({
    backgroundColor: 'grey',
    padding: '15px',
    margin: '10px 0px',
    '&:hover': {
        backgroundColor: 'rgb(102, 102, 102)'
    },
    display: 'block',
    textAlign: 'left',
    color: 'white'
});

const NoteTitle = styled(Typography)({
    fontSize: '30px',
    fontWeight: 'bold'
});

const DateText = styled(Typography)({
    fontSize: '15px'
});