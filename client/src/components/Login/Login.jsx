import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";
import { logIn } from "../../redux/usersRedux";
import { TextField, Button, Container, Typography, Box, CircularProgress, Alert } from "@mui/material";

const LogIn = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] =useState('');
  const [ status, setStatus ] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then( res => {
        if(res.status === 200) {
          setStatus('success');
          dispatch(logIn({ username }));
          navigate('/');
        } else if (res.status === 400) {
          setStatus('clientError');
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
          Log in
        </Typography>

        { status === 'success' && <Alert severity="success">You have been successfully logged in.</Alert> }
        { status === 'clientError' && <Alert severity="error">Login or password are incorect.</Alert> }
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

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sgin in
          </Button>
        </form>
      </Box>
    </Container>
  )
};

export default LogIn;