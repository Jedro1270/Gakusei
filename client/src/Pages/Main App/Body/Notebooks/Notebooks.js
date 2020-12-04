import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { List, ListItem, Typography, styled } from '@material-ui/core';

export default function Notebooks(props) {

    useEffect(() => {
        props.setTitle('Notebooks');
        props.setBackButtonNav(false);
    });

    return (

        <List>
            <CustomLink to='/notebooks/notebook-1'>
                <Notebook button>
                    <NotebookTitle>
                        Notebook 1
                    </NotebookTitle>
                </Notebook>
            </CustomLink>

            <CustomLink to='/notebooks/notebook-2'>
                <Notebook button>
                    <NotebookTitle>
                        Notebook 2
                    </NotebookTitle>
                </Notebook>
            </CustomLink>

            <CustomLink to='/notebooks/notebook-3'>
                <Notebook button>
                    <NotebookTitle>
                        Notebook 3
                    </NotebookTitle>
                </Notebook>
            </CustomLink>

            <CustomLink to='/notebooks/notebook-4'>
                <Notebook button>
                    <NotebookTitle>
                        Notebook 4
                    </NotebookTitle>
                </Notebook>
            </CustomLink>
        </List>
 
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