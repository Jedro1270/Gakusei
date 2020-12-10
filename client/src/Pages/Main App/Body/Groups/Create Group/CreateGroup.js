import { Box, InputBase, Paper, Avatar, styled, Button, Typography } from '@material-ui/core'; 
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CustomAjax from '../../../../../CustomAjax';
import changeTitle from '../../../../../Redux/Actions/ChangeTitle';
import { setBackButton } from '../../../../../Redux/Actions/ChangeHeaderNavigation';

export default function CreateGroup() {

    const [groupname, setGroupname] = useState('');
    const [file, setFile] = useState(null);
    const [temporaryFile, setTemporaryFile] = useState(null);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(changeTitle('Create Group'));
        dispatch(setBackButton());
    });

    const submitForm = () => {
        const formData = new FormData();

        formData.append('groupname', groupname);
        formData.append('file', file);

        const ajax = new CustomAjax();

        ajax.post('http://localhost:2727/groups/create-group', formData, false);
        ajax.stateListener((response) => {
            if (response === 'Group Inserted') {
                history.push('/groups');
            }
        });
    }

     return (
        <CreateGroupForm>

            <GroupIcon src={temporaryFile}/>

            <UploadImageButton variant='outlined' component='label'>
                <UploadButtonLabel>
                    Upload Group Icon
                </UploadButtonLabel>
                <input type='file' accept='image/*' hidden onChange={(event) => {
                    const chosenFile = event.target.files[0]

                    setFile(chosenFile);
                    setTemporaryFile(URL.createObjectURL(chosenFile));
                }}/>
            </UploadImageButton>

            <GroupNameForm>
                <GroupNameInput placeholder='Group Name' onChange={(event) => {setGroupname(event.target.value)}}/>
            </GroupNameForm>

            <SubmitButton onClick={() => {submitForm()}}>
                CREATE
            </SubmitButton>

        </CreateGroupForm>
     );
}

const CreateGroupForm = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    margin: 'auto',
    alignItems: 'center'
});

const GroupNameForm = styled(Paper)({
    width: '50%',
    margin: '40px',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'white',
});

const GroupNameInput = styled(InputBase)({
    margin: '20px',
    color: 'black',
    width: '100%'
});

const GroupIcon = styled(Avatar)({
    margin: '40px',
    height: '250px',
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
});

const UploadImageButton = styled(Button)({
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'lightgrey'
    },
    width: '30%',
    padding: '10px'
});

const UploadButtonLabel = styled(Typography)({
    fontSize: '20px',
});

const SubmitButton = styled(Button)({
    variant: 'contained',
    marginTop: '20px',
    marginBottom: '30px',
    padding: '30px',
    backgroundColor: 'grey',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgb(89, 89, 89)'
    },
    width: '50%',
    fontSize: '20px'
});