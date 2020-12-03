import { List, ListItem, Typography, styled } from "@material-ui/core";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Notes(props) {

    // To do:
    // Use database data to get proper note title for header and contents

    const { notebookTitle } = useParams();

    useEffect(() => {
        props.setTitle(notebookTitle); // Change to proper note title
        props.setBackButtonNav(true);
    });

    return (
        <List>

            <CustomLink to={`/notebooks/${notebookTitle}/note-1`}>
                <Note button>
                    <NoteTitle>
                        note 1
                    </NoteTitle>
                </Note>
            </CustomLink>

            <CustomLink to={`/notebooks/${notebookTitle}/note-2`}>
                <Note button>
                    <NoteTitle>
                        note 2
                    </NoteTitle>
                </Note>
            </CustomLink>
        </List>
    );
}

const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: 'white'
});

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