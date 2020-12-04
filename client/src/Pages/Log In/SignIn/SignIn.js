import { Grid, Link, TextField, styled, Box } from '@material-ui/core';

import React from 'react';
import Title from '../Title';
import AppLogo from '../AppLogo';
import SubmitButton from '../SubmitButton';

export default function SignUp() {
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
              />
            </Grid>

          </Grid>

          <SubmitButton text='SIGN IN'/>

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