import { Grid, Link, TextField, styled, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CustomAjax from '../../../CustomAjax';
import { useHistory } from 'react-router-dom';

import React, { useState } from 'react';
import Title from '../Title';
import AppLogo from '../AppLogo';
import SubmitButton from '../SubmitButton';

export default function SignUp() {

  const history = useHistory();

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [incompleteFields, setIncompleteFields] = useState(false);
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);

  const register = () => {
    if (registerUsername.trim().length > 0 && registerPassword.trim().length > 0) {
      const data = {
        username: registerUsername,
        password: registerPassword
      }
  
      const ajax = new CustomAjax();
  
      ajax.post('http://localhost:2727/sign-up', data, true);
      ajax.stateListener((response) => {
        response = JSON.parse(response);
        if (response.message === 'Username Taken') {
          setUsernameTaken(true);
        } else {
          setSuccessfulSignUp(true);
        }
      });
    } else {
      setIncompleteFields(true);
    }
  }

  if (successfulSignUp) {

    history.push('/sign-in');
    return null;

  } else {
    let alert = null;

    if (usernameTaken) {
      alert = <Alert severity='error' onClose={() => { setUsernameTaken(false) }} >Username is already taken!</Alert>
    } else if (incompleteFields) {
      alert = <Alert severity='error' onClose={() => { setIncompleteFields(false) }} >You have incomplete fields!</Alert>
    }

    return (
      <SignUpBody>

        <AppLogo />

        <Title title='Sign Up' />

        {alert}

        <form>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='username'
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                autoFocus
                onChange={(event) => setRegisterUsername(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(event) => setRegisterPassword(event.target.value)}
              />
            </Grid>

          </Grid>

          <SubmitButton text='SUBMIT' submit={register} />

          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/sign-in' variant='body2'>
                Already have an account? Sign in
                </Link>
            </Grid>
          </Grid>
        </form>

      </SignUpBody>
    );
  }
}

const SignUpBody = styled(Box)({
  padding: '5px',
  component: 'main',
  maxWidth: 'false',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});