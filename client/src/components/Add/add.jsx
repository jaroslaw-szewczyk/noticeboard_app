import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, CircularProgress, Alert } from "@mui/material";

import { API_URL } from "../../../config";

const Add = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState(null);
  
  const handleSubmit = e => {
    e.preventDefault();
  
    // const fd = new FormData();
    // fd.append('username', username );
    // fd.append('password', password );
    // fd.append('phoneNumber', phoneNumber );
    // fd.append('avatar', avatar );
  
    // const options = {
    //   method: 'POST',
    //   body: fd,
    // }
    
    // setStatus('loading');
    // fetch(`${API_URL}/auth/register`, options)
    //   .then( res => {
    //     if(res.status === 201) {
    //       setStatus('success');
    //     } else if (res.status === 400) {
    //       setStatus('clientError');
    //     } else if (res.status === 409) {
    //       setStatus('loginError');
    //     } else {
    //       setStatus('serverError');
    //     }
    //   }) 
    //   .catch(err => {
    //     setStatus('serverError');
    // });
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
            label="Title"
            name="title"
            value={ title }
            onChange={ e => setTitle(e.target.value) }
            margin="normal"      
          />

          <TextField
            fullWidth
            label="Text"
            name="text"
            type="text"
            value={ text }
            onChange={ e => setText(e.target.value) }
            margin="normal"
          />

          <TextField
            fullWidth
            name="Photo"
            type="file"
            onChange={e => setPhoto(e.target.files[0])}
            margin="normal"  
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={ price }
            onChange={ e => setPrice(e.target.value) }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            type="text"
            value={ location }
            onChange={ e => setLocation(e.target.value) }
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            add advertisement
          </Button>
        </form>
      </Box>
    </Container>
  )
};

export default Add;