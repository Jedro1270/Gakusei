import { Link } from 'react-router-dom';
import { ListItem, Typography, styled, Box } from '@material-ui/core';
import ActionButtons from './ActionButtons';

export default function SelectableNotebook(props) {

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
                setNewTitle = { props.setRenamedTitle }
                rename={() => {props.renameNotebook(props.notebookID)}}
                delete={() => {props.deleteNotebook(props.notebookID)}}
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