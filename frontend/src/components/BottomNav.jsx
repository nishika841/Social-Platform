import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import TasksIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import SocialIcon from '@mui/icons-material/Public';
import LeaderboardIcon from '@mui/icons-material/EmojiEventsOutlined';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlined';


const BottomNav = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderTop: '1px solid #EAEAEA',
      }}
    >
      <BottomNavigation
        value={2} // 'Social' is active (index 2)
        sx={{
          height: 64,
          backgroundColor: '#ffffff',
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            color: '#8E8E93',
            '&.Mui-selected': { color: '#1877F2' },
            minWidth: 'auto',
          }}
        />
        <BottomNavigationAction
          label="Tasks"
          icon={<TasksIcon />}
          sx={{
            color: '#8E8E93',
            '&.Mui-selected': { color: '#1877F2' },
            minWidth: 'auto',
          }}
        />
        
        {/* Active Social Tab with custom highlight */}
        <BottomNavigationAction
          label="Social"
          icon={
            <Box
              sx={{
                backgroundColor: '#E8F2FF',
                borderRadius: '20px',
                px: 2,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SocialIcon sx={{ color: '#1877F2' }} />
            </Box>
          }
          sx={{
            color: '#1877F2',
            fontWeight: 800,
            '& .MuiBottomNavigationAction-label': {
              fontWeight: 800,
              fontSize: '12px',
              mt: 0.5,
            },
            minWidth: 'auto',
          }}
        />

        <BottomNavigationAction
          label="Leader Board"
          icon={<LeaderboardIcon />}
          sx={{
            color: '#8E8E93',
            '&.Mui-selected': { color: '#1877F2' },
            minWidth: 'auto',
          }}
        />
        <BottomNavigationAction
          label="Chat"
          icon={<ChatIcon />}
          sx={{
            color: '#8E8E93',
            '&.Mui-selected': { color: '#1877F2' },
            minWidth: 'auto',
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
