import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const Navbar = ({ signInProp }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [signIn, setSignIn] = useState(signInProp);

  useEffect(() => {
    setSignIn(signInProp);
  }, [signInProp]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ['login', 'add', 'edit'];

  return (
    <AppBar position="static" sx={{ mt: 2, borderRadius: '8px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'block' }}>
          <NavLink to="/">
            <Button sx={{ color: 'white' }}>Home</Button>
          </NavLink>
        </Box>

        {/* Menu mobilne */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <NavLink to={`/${page}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
                    {page}
                  </Typography>
                </NavLink>
              </MenuItem>
            ))}
            <MenuItem onClick={handleCloseNavMenu}>
              {signIn ? (
                <NavLink to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Log out</Typography>
                </NavLink>
              ) : (
                <NavLink to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ textAlign: 'center', textTransform: 'uppercase' }}>Register</Typography>
                </NavLink>
              )}
            </MenuItem>
          </Menu>
        </Box>

        {/* Menu na dużych ekranach */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
          {pages.map((page) => (
            <NavLink key={page} to={`/${page}`}>
              <Button sx={{ my: 2, color: 'white', textTransform: 'uppercase' }}>
                {page}
              </Button>
            </NavLink>
          ))}
          {signIn ? (
            <NavLink to={'/logout'}>
              <Button sx={{ my: 2, color: 'white', textTransform: 'uppercase' }}>
                Log out
              </Button>
            </NavLink>
          ) : (
            <NavLink to={'/register'}>
              <Button sx={{ my: 2, color: 'white', textTransform: 'uppercase' }}>
                Register
              </Button>
            </NavLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;