import React, { useEffect } from 'react';
import { List, ListItem, Typography, styled } from '@material-ui/core';

export default function Notebooks(props) {

    useEffect(() => {
        props.setTitle('Notebooks');
    });

    return (
        <List>

            <Notebook button>
                <NotebookTitle>
                    Notebook 1
                </NotebookTitle>
            </Notebook>

            <Notebook button>
                <NotebookTitle>
                    Notebook 2
                </NotebookTitle>
            </Notebook>

            <Notebook button>
                <NotebookTitle>
                    Notebook 3
                </NotebookTitle>
            </Notebook>

        </List>
    );
}

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