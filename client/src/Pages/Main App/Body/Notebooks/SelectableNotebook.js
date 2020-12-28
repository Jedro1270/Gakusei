import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, Typography, styled, Box } from '@material-ui/core';
import ActionButtons from './ActionButtons';
import CustomAjax from '../../../../CustomAjax';
import { useSelector } from 'react-redux';

export default function SelectableNotebook(props) {

    const [newTitle, setNewTitle] = useState('');

    const currentGroup = useSelector((state) => { return state.currentGroupState });
    const token = useSelector((state) => { return state.tokenState });
    const ajax = new CustomAjax();

    const renameNotebook = () => {
        const data = {
            title: newTitle
        }

        ajax.put(`http://localhost:2727/api/notebooks/${currentGroup.id}/${props.notebookID}`, data, true, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            props.loadNotebooks(true);
        });
    }

    const deleteNotebook = () => {
        ajax.delete(`http://localhost:2727/api/notebooks/${currentGroup.id}/${props.notebookID}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            props.loadNotebooks(true);
        });
    }

    return (

        <SelectableNotebookBody>
            <CustomLink to={{ pathname: `/api/notebooks/${props.notebookURL}`, state: { notebookID: props.notebookID, notebookTitle: props.title } }}>
                <Notebook button>
                    <NotebookTitle>
                        {props.title}
                    </NotebookTitle>
                </Notebook>
            </CustomLink>

            <ActionButtons 
                setNewTitle = { setNewTitle }
                rename={ renameNotebook }
                delete={ deleteNotebook }
                label={ 'Notebook' }
                selectedTitle={ props.title }
            />
        </SelectableNotebookBody>

    );
}

const SelectableNotebookBody = styled(Box)({
    display: 'flex',
    flexDirection: 'row'
});

const CustomLink = styled(Link)({
    textDecoration: 'none',
    color: 'white',
    flex: '3'
});

const Notebook = styled(ListItem)({
    backgroundColor: 'grey',
    padding: '15px',
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