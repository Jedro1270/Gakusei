import React from 'react';
import {Link} from 'react-router-dom';
import { ListItem, Typography, styled } from '@material-ui/core';

export default function SelectableNotebook(props) {

    return (

        <CustomLink to={{ pathname: `/api/notebooks/${props.notebookURL}`, state: {notebookID: props.notebookID}}}>
            <Notebook button>
                <NotebookTitle>
                    {props.title}
                </NotebookTitle>
            </Notebook>
        </CustomLink>

    );
}

const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: 'white'
});

const Notebook = styled(ListItem)({
    backgroundColor: 'grey',
    padding: '10px',
    margin: '10px 0px',
    '&:hover': {
        backgroundColor: 'rgb(102, 102, 102)'
    }
});

const NotebookTitle = styled(Typography)({
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold'
});