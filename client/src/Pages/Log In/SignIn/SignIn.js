import { Grid, Link, TextField, styled, Box } from '@material-ui/core';
import Axios from 'axios';

import React, { useState } from 'react';
import Title from '../Title';
import AppLogo from '../AppLogo';
import SubmitButton from '../SubmitButton';

export default function SignIn() {

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const logIn = () => {
    Axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
       withCredentials: true,
       url: 'http://localhost:2727/sign-in'
    }).then((response) => console.log(response))
  }

  return (
    <SignInBody>

        <AppLogo/>

        <Title title='Sign In'/>

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
                onChange={(event) => setLoginUsername(event.target.value)}
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
                onChange={(event) => setLoginPassword(event.target.value)}
              />
            </Grid>

          </Grid>

          <SubmitButton text='SIGN IN' submit={logIn}/>

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

const SignInBody = styled(Box)({
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