import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  InputBase,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoonIcon from '@mui/icons-material/NightsStay';
import StarIcon from '@mui/icons-material/Star';
import RupeeIcon from '@mui/icons-material/CurrencyRupee';


const Header = ({ onProfileClick, user }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #EAEAEA',
        px: 2,
        py: 1.5,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* Top row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#1A1A1A',
            letterSpacing: '-0.5px',
          }}
        >
          Social
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Stars Pill */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFF0F0',
              borderRadius: '20px',
              px: 1.5,
              py: 0.5,
              border: '1px solid #FFCDCD',
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: '#D32F2F', display: 'flex', alignItems: 'center', gap: 0.2 }}
            >
              50
              <StarIcon sx={{ fontSize: 16, color: '#F0B90B' }} />
            </Typography>
          </Box>

          {/* Balance Pill */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#E8F5E9',
              borderRadius: '20px',
              px: 1.5,
              py: 0.5,
              border: '1px solid #C8E6C9',
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 0.1 }}
            >
              <RupeeIcon sx={{ fontSize: 14 }} />
              0.00
            </Typography>
          </Box>

          {/* Notifications Bell */}
          <IconButton size="small" sx={{ ml: 0.5 }}>
            <Badge badgeContent={1} color="error">
              <NotificationsIcon sx={{ color: '#555555' }} />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <Avatar
            onClick={onProfileClick}
            src={user?.avatar}
            alt={user?.username}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              border: '2px solid #1877F2',
              backgroundColor: '#1877F2',
            }}
          >
            {user?.username?.slice(0, 2).toUpperCase()}
          </Avatar>
        </Box>
      </Box>

      {/* Bottom row (Search & controls) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            backgroundColor: '#F0F2F5',
            borderRadius: '24px',
            boxShadow: 'none',
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, fontSize: '14px' }}
            placeholder="Search promotions, users, posts..."
            inputProps={{ 'aria-label': 'search posts' }}
          />
        </Paper>

        <IconButton
          sx={{
            backgroundColor: '#1877F2',
            color: '#ffffff',
            width: 38,
            height: 38,
            '&:hover': { backgroundColor: '#1464CA' },
          }}
        >
          <SearchIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <IconButton
          sx={{
            backgroundColor: '#F0F2F5',
            width: 38,
            height: 38,
          }}
        >
          <MoonIcon sx={{ fontSize: 18, color: '#555555' }} />
        </IconButton>

        <Avatar
          onClick={onProfileClick}
          src={user?.avatar}
          sx={{
            width: 38,
            height: 38,
            cursor: 'pointer',
            backgroundColor: '#FFB74D',
          }}
        >
          {user?.username?.slice(0, 2).toUpperCase()}
        </Avatar>
      </Box>
    </Box>
  );
};

export default Header;
