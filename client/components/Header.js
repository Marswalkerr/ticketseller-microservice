import React, { useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, Container, Menu, MenuItem, IconButton, Badge, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRouter } from 'next/router';

const Header = ({ currentUser }) => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isTestMode, setIsTestMode] = useState(true);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (path) => {
    handleCloseNavMenu();
    handleCloseUserMenu();
    router.push(path);
  };

  const pages = [
    { title: 'Home', path: '/' },
    { title: 'Events', path: '/#events', hasMenu: true }
  ];

  const userMenuItems = currentUser 
    ? [
        { title: 'My Orders', path: '/orders', icon: <ReceiptIcon fontSize="small" sx={{ mr: 1 }} /> },
        { title: 'Sell Tickets', path: '/tickets/new', icon: <AddBoxIcon fontSize="small" sx={{ mr: 1 }} /> },
        { title: 'Sign Out', path: '/auth/signout', icon: null }
      ]
    : [
        { title: 'Sign In', path: '/auth/signin', icon: null },
        { title: 'Sign Up', path: '/auth/signup', icon: null }
      ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#5D3FD3' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href="/">
              <a style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '0.1rem',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  TicketSeller
                </Typography>
              </a>
            </Link>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => navigateTo(page.path)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={() => navigateTo('/?category=concerts')}>
                <Typography textAlign="center">Concerts</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/?category=sports')}>
                <Typography textAlign="center">Sports</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/?category=theater')}>
                <Typography textAlign="center">Theater</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/?category=conferences')}>
                <Typography textAlign="center">Conferences</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo for mobile screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <Link href="/">
              <a style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '0.1rem',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  TicketSeller
                </Typography>
              </a>
            </Link>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <React.Fragment key={page.title}>
                {page.hasMenu ? (
                  <Box sx={{ position: 'relative' }} className="nav-item dropdown">
                    <Button
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      color="inherit"
                      sx={{ my: 2, display: 'block' }}
                    >
                      {page.title}
                    </Button>
                    <Box className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link href="/?category=concerts">
                        <a className="dropdown-item">Concerts</a>
                      </Link>
                      <Link href="/?category=sports">
                        <a className="dropdown-item">Sports</a>
                      </Link>
                      <Link href="/?category=theater">
                        <a className="dropdown-item">Theater</a>
                      </Link>
                      <Link href="/?category=conferences">
                        <a className="dropdown-item">Conferences</a>
      </Link>
                    </Box>
                  </Box>
                ) : (
                  <Button
                    onClick={() => navigateTo(page.path)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.title}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
              <AccountCircleIcon />
              <Typography variant="body1" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
                {currentUser ? 'My Account' : 'Sign In'}
              </Typography>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems.map((item) => (
                <MenuItem key={item.title} onClick={() => navigateTo(item.path)}>
                  {item.icon}
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* Show quick sell tickets button if user is logged in */}
          {currentUser && (
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ ml: 2, display: { xs: 'none', sm: 'block' } }}
              onClick={() => navigateTo('/tickets/new')}
            >
              Sell Tickets
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
