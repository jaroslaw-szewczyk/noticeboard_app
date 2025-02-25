import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Add from './components/add/add';
import Edit from './components/edit/Edit';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './components/Nav/Navbar';

const App = () => {
  return (
  <>
    <CssBaseline />
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit" element={<Edit />} />
      </Routes>
      
    </Container>
  </>
  )
}

export default App;
