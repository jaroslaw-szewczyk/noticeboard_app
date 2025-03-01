import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './components/Home/Home';
import Login from './components/Login/LogIn';
import SignUp from './components/SignUp/SignUp';
import Add from './components/Add/add';
import Edit from './components/Edit/Edit';
import LogOut from './components/LogOut/LogOut'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './components/Nav/Navbar';
import CardDeets from './components/CardDeets/CardDeets';
import EditAd from './components/EditAd/EditAd';
import Delete from './components/Delete/delete';

import { loadUserRequest } from './redux/usersRedux';
import { loadAdsRequest } from "./redux/adsRedux";

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector( state => state.users); 

  const [ signIn, setSignIn ] = useState('false');

  useEffect(() => {
    dispatch(loadAdsRequest());
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/add" element={<Add signInProp={signIn}/>} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit/:id" element={<EditAd />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/cardDeets/:id" element={<CardDeets signInProp={signIn}/>} />
      </Routes>
      
    </Container>
  </>
  )
}

export default App;
