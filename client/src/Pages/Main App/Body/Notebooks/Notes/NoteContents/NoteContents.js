import { List, ListItem, Typography, styled } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setBackButton } from "../../../../../../Redux/Actions/ChangeHeaderNavigation";
import changeTitle from "../../../../../../Redux/Actions/ChangeTitle";

export default function NoteContents(props) {

    const { noteTitle } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeTitle(''));
        dispatch(setBackButton());
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