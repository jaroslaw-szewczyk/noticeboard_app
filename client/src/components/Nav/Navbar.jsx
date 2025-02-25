import React, { useState } from 'react';
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

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ['login', 'register', 'add', 'edit'];

  return (
    <AppBar position="static" sx={{ mt: 2, borderRadius: '8px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        {/* Przycisk 'Login' po lewej stronie na małych ekranach */}
        <Box sx={{ display: { xs: 'block'} }}>
          <NavLink to='/'><Button sx={{ color: 'white' }}>home  </Button></NavLink>
        </Box>

        {/* Ikona menu po prawej stronie na małych ekranach */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
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
                <Typography sx={{ textAlign: 'center', textTransform: 'uppercase' }}>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Menu na dużych ekranach */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end'}}>
          {pages.map((page) => (
            <NavLink to={`/${page}`}>
              <Button key={page} sx={{ my: 2, color: 'white', textTransform: 'uppercase' }}>
                {page}
              </Button>
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;