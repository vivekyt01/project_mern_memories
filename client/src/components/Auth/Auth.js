import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin} from 'react-google-login';
import { useDispatch } from'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from '../Input/Input';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {};

  const handleChange = () => {};

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleGoogleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type: 'AUTH' , data: { result,token}});
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "1058296266674-251c9htbe4u4vde7ku6u1l3o01jd6953.apps.googleusercontent.com",
        callback: handleGoogleSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt();
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <div id="googleSignInButton"></div>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
