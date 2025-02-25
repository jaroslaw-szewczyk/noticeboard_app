import React, { useState } from "react";

import { TextField, Button, Container, Typography, Box, CircularProgress, Alert } from "@mui/material";

import { API_URL } from "../../../config";

const SignUp = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    console.log(username, password, phoneNumber, avatar)

    console.log('avatar: ', typeof avatar)

    const fd = new FormData();
    fd.append('username', username );
    fd.append('password', password );
    fd.append('phoneNumber', phoneNumber );
    fd.append('avatar', avatar );

    const options = {
      method: 'POST',
      body: fd,
    }
    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
      .then( res => {
        if(res.status === 201) {
          setStatus('success');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      }) 
      .catch(err => {
        setStatus('serverError');
      });
  }

  return (
    <Container  maxWidth='xs'>
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Sign up
          </Typography>

            { status === 'success' && <Alert severity="success">You have been successfully registerd! You can now log in...</Alert> }
            { status === 'clientError' && <Alert severity="error">You have to fill all the fields.</Alert> }
            { status === 'loginError' && <Alert severity="warning">Login alredy in use.</Alert> }
            { status === 'serverError' && <Alert severity="error">Smething went wrong...</Alert> }
            { status === 'loading' && <CircularProgress /> }
         
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={ username }
              onChange={ e => setUsername(e.target.value) }
              margin="normal"
              
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={ password }
              onChange={ e => setPassword(e.target.value) }
              margin="normal"
              
            />
            <Typography sx={{mb: -2}}>
              Avatar
            </Typography>
            <TextField
              fullWidth
              name="avatar"
              type="file"
              onChange={e => setAvatar(e.target.files[0])}
              margin="normal"
              
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={ phoneNumber }
              onChange={ e => setPhoneNumber(e.target.value) }
              margin="normal"
              
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Zarejestruj się
            </Button>
          </form>
        </Box>
      </Container>
  )
};

export default SignUp;