import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Feed from './pages/Feed';
import Login from './pages/Login';
import { Box, CircularProgress } from '@mui/material';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#F4F6F9',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? <Feed /> : <Login />;
}

export default App;
