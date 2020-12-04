import { List, ListItem, Typography, styled } from "@material-ui/core";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function NoteContents(props) {

    const { noteTitle } = useParams();

    useEffect(() => {
        props.setBackButtonNav(true);
        props.setTitle('')
    });

    return (
        <List>

            adassd

        </List>
    );
}

const Note = styled(ListItem)({
    backgroundColor: 'grey',
    padding: '10px',
    margin: '10px 0px',
    '&:hover': {
        backgroundColor: 'rgb(102, 102, 102)'
    }
});

const NoteTitle = styled(Typography)({
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold'
});