import { Grid, Link, TextField, styled, Box } from '@material-ui/core';
import Axios from 'axios';

import React, { useState } from 'react';
import Title from '../Title';
import AppLogo from '../AppLogo';
import SubmitButton from '../SubmitButton';

export default function SignUp() {

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = () => {
    Axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword
      },
       withCredentials: true,
       url: 'http://localhost:2727/sign-up'
    }).then((response) => console.log(response))
  }

  return (
    <SignUpBody>

        <AppLogo/>

        <Title title='Sign Up'/>

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

          <SubmitButton text='SUBMIT' submit={register}/>

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