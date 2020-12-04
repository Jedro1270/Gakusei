import { Grid, Link, TextField, styled, Box } from '@material-ui/core';

import React from 'react';
import Title from '../Title';
import AppLogo from '../AppLogo';
import SubmitButton from '../SubmitButton';

export default function SignUp() {
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

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='current-password'
              />
            </Grid>

          </Grid>

          <SubmitButton text='SUBMIT'/>

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
  padding: '20px',
  component: 'main',
  maxWidth: 'false',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});