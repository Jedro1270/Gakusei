import { Grid, Link, TextField, styled, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import CustomAjax from '../../../CustomAjax';
import setToken from '../../../Redux/Actions/SetTokenState';
import Title from '.././Log In Components/Title';
import AppLogo from '.././Log In Components/AppLogo';
import SubmitButton from '.././Log In Components/SubmitButton';
import setUser from '../../../Redux/Actions/SetUserState';

export default function SignIn() {

  const history = useHistory();
  const dispatch = useDispatch();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const logIn = () => {
    const data = {
      username: loginUsername,
      password: loginPassword
    }

    const ajax = new CustomAjax();

    ajax.post('http://localhost:2727/sign-in', data, true);
    ajax.stateListener((response) => {
      response = JSON.parse(response);
      if (response.message === 'Successfully Authenticated') {
        dispatch(setToken(response.token));
        dispatch(setUser(response.user));
        setLoggedIn(true);
      } else {
        setInvalidCredentials(true);
      }
    });
  }

  if (loggedIn) {

    history.push('/api/groups');
    return null;

  } else {
    let alert = null;

    if (invalidCredentials) {
      alert = <Alert severity='error' onClose={() => { setInvalidCredentials(false) }} >Invalid username or password!</Alert>
    }

    return (
      <SignInBody>

        <AppLogo />

        <Title title='Sign In' />

        {alert}

        <form>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                autoFocus
                onChange={(event) => setLoginUsername(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Password'
                type='password'
                onChange={(event) => setLoginPassword(event.target.value)}
              />
            </Grid>

          </Grid>

          <SubmitButton text='SIGN IN' submit={logIn} />

          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/sign-up' variant='body2'>
                Don't have an account? Sign Up
                </Link>
            </Grid>
          </Grid>
        </form>

      </SignInBody>
    );
  }
}

const SignInBody = styled(Box)({
  padding: '5px',
  component: 'main',
  height: '100%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});