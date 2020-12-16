import { ListItem, Typography, styled } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Notes(props) {

    return (

        <CustomLink to={{ pathname: `/api/notebooks/${props.notebookTitle}/${props.noteURL}`, state: { noteID: props.noteID } }}>
            <Note button>
                <DateText>
                    {props.dateEdited}
                </DateText>

                <NoteTitle>
                    {props.noteTitle}
                </NoteTitle>

                <NotePreview noWrap>
                    {props.contents}
                </NotePreview>
            </Note>
        </CustomLink>
    );
}

const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: 'white'
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

const NotePreview = styled(Typography)({
    fontSize: '20px',
    width: '80%'
});