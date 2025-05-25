import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useAuthStore } from '../store/useAdminstore';

const settings = ['Profile', 'Settings', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const username = useAuthStore((state) => state.username);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = async (setting) => {
    setAnchorElUser(null);
    if (setting === 'Logout') {
      await logout();
      navigate('/');
    }
    // Optionally handle 'Profile' and 'Settings' here
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #7c3aed 0%, #1D8348 100%)',
        boxShadow: '0 4px 20px 0 rgba(60,72,88,.15)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InsertChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/dashboard')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: '#facc15' },
            }}
          >
            Excel Analytics
          </Typography>

          <InsertChartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/dashboard')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: '#facc15' },
            }}
          >
            Excel Analytics
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: '#facc15',
                    color: '#1D8348',
                    fontWeight: 700,
                    border: '2px solid #fff',
                  }}
                  alt={username || 'User'}
                >
                  {getInitials(username)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '45px',
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  minWidth: 160,
                  boxShadow: '0 4px 20px 0 rgba(60,72,88,.15)',
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, idx) => (
                <React.Fragment key={setting}>
                  <MenuItem
                    onClick={() => handleMenuClick(setting)}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f3f4f6',
                        color: '#7c3aed',
                      },
                      fontWeight: setting === 'Logout' ? 700 : 400,
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                  {setting === 'Settings' && <Divider />}
                </React.Fragment>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;