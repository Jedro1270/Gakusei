import { List, ListItem, Typography, styled } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { setBackButton } from "../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from '../../../../../Redux/Actions/ChangeTitle'

export default function Notes(props) {

    // To do:
    // Use database data to get proper note title for header and contents

    const { notebookTitle } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeTitle(notebookTitle));
        dispatch(setBackButton());
    });

    return (
        <List>

            <CustomLink to={`/notebooks/${notebookTitle}/note-1`}>
                <Note button>
                    <DateText>
                        01/27/2000
                    </DateText>

                    <NoteTitle>
                        note 1
                    </NoteTitle>

                    <NotePreview noWrap>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </NotePreview>
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