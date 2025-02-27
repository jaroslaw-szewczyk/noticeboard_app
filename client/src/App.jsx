import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Add from './components/Add/add';
import Edit from './components/edit/Edit';
import LogOut from './components/LogOut/LogOut'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './components/Nav/Navbar';

import { loadUserRequest } from './redux/usersRedux';

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector( state => state.users); 

  const [ signIn, setSignIn ] = useState('false');

  useEffect(() => {
    dispatch(loadUserRequest());
  }, [dispatch]);
  
  useEffect(() => {
    // Jeśli user istnieje i ma username, ustawiamy signIn na true
    if (user && user.username) {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  }, [user]);

  return (
  <>
    <CssBaseline />
    <Container maxWidth="lg">
      <Navbar signInProp={signIn}/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login signInProp={signIn} />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/add" element={<Add signInProp={signIn}/>} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/logout" element={<LogOut />} />
      </Routes>
      
    </Container>
  </>
  )
}

export default App;
