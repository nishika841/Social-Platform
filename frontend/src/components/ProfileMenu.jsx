import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import AccountBox from '@mui/icons-material/AccountBox';
import WorkspacePremium from '@mui/icons-material/WorkspacePremium';
import HelpOutline from '@mui/icons-material/HelpOutlined';
import Chat from '@mui/icons-material/Chat';
import Feedback from '@mui/icons-material/Feedback';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';
import Info from '@mui/icons-material/Info';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Star from '@mui/icons-material/Star';


const ProfileMenu = ({ open, onClose, user, onSignOut }) => {
  const menuItems = [
    {
      text: 'My Profile',
      icon: <AccountBox />,
      badge: (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Button size="small" variant="contained" color="primary" sx={{ fontSize: '9px', px: 1, py: 0.2, borderRadius: '4px', height: '18px' }}>
            Get 800
            <Star sx={{ fontSize: 10, ml: 0.2, color: '#F0B90B' }} />
          </Button>
          <Button size="small" variant="contained" color="secondary" sx={{ fontSize: '9px', px: 1, py: 0.2, borderRadius: '4px', height: '18px', backgroundColor: '#e0e0e0', color: '#333333' }}>
            Free
          </Button>
        </Box>
      ),
    },
    { text: 'Activate Premium Plus', icon: <WorkspacePremium /> },
    { text: 'Help and Support', icon: <HelpOutline /> },
    { text: 'Chat with Us', icon: <Chat /> },
    { text: 'Feedback', icon: <Feedback /> },
    { text: 'FAQ', icon: <QuestionAnswer /> },
    { text: 'About', icon: <Info /> },
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '280px',
          maxWidth: '85vw',
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: '16px',
        },
      }}
    >
      {/* Profile Header inside Menu */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          backgroundColor: '#F0F2F5',
        }}
      >
        <Avatar src={user?.avatar} sx={{ width: 64, height: 64, border: '3px solid #1877F2' }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {user?.username}
        </Typography>
        <Typography variant="body2" sx={{ color: '#65676B' }}>
          {user?.email}
        </Typography>
      </Box>

      <Divider />

      {/* Options List */}
      <List sx={{ flexGrow: 1, py: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding secondaryAction={item.badge}>
            <ListItemButton onClick={onClose}>
              <ListItemIcon sx={{ minWidth: '40px', color: '#1877F2' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: '14px', fontWeight: 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* Sign Out option */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => { onSignOut(); onClose(); }}>
            <ListItemIcon sx={{ minWidth: '40px', color: '#D32F2F' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Sign Out"
              primaryTypographyProps={{ fontSize: '14px', fontWeight: 600, color: '#D32F2F' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default ProfileMenu;
