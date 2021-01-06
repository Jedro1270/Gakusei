import { ListItem, Typography, styled, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

import ActionButtons from "../ActionButtons";

export default function Notes(props) {

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
                setNewTitle={ props.setNewTitle }
                rename={() => {props.renameNote(props.noteID)}}
                delete={() => {props.deleteNote(props.noteID)}}
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