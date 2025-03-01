import React, { useState } from "react";
import { useEffect } from "react";
import { TextField, Button, Container, Typography, Box, CircularProgress, Alert } from "@mui/material";

import { API_URL } from "../../../config";

const Add = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];

    setStatus('loading');
    const fd = new FormData();
    fd.append('title', title );
    fd.append('text', text );
    fd.append('date', formattedDate );
    fd.append('image', image );
    fd.append('price', price );
    fd.append('location', location );

    const options = {
      method: 'POST',
      body: fd,
      credentials: "include"
    }
    
    await fetch(`${API_URL}/api/ads`, options)
      .then( res => {
        if(res.status === 200) {
          setStatus('success');
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
          Add advertisement
        </Typography>
    
        { status === 'success' && <Alert severity="success">You have added a new advertisement </Alert> }
        { status === 'clientError' && <Alert severity="error">You have to fill all the fields.</Alert> }
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
            multiline
            rows={4}
            value={ text }
            onChange={ e => setText(e.target.value) }
            margin="normal"
          />

          <TextField
            fullWidth
            name="Photo"
            type="file"
            onChange={e => setImage(e.target.files[0])}
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