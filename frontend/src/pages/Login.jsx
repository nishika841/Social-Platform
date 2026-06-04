import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  InputAdornment,
  IconButton,
  Alert,
  Paper,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import Security from '@mui/icons-material/Security';
import Public from '@mui/icons-material/Public';

import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login, signup } = useContext(AuthContext);
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!email || !password || (isRegistering && !username)) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    
    if (isRegistering) {
      const res = await signup(username, email, password);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setInfoMsg('Account created successfully!');
      }
    } else {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    }
    
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F0B90B', // TaskPlanet Warm Gold background
      }}
    >
      {/* Top Half: Illustration and Text */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          pt: 4,
          pb: 2,
          px: 3,
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        {/* Inline SVG Illustration */}
        <svg
          width="180"
          height="140"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: '16px' }}
        >
          {/* Main platform */}
          <rect x="20" y="90" width="160" height="24" rx="8" fill="#FFFFFF" fillOpacity="0.4" />
          <rect x="25" y="86" width="150" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.8" />
          {/* Calendar clock */}
          <circle cx="100" cy="50" r="30" fill="#FFFFFF" />
          <circle cx="100" cy="50" r="26" fill="#E8F2FF" />
          <path d="M100 35 V50 H115" stroke="#1877F2" strokeWidth="4" strokeLinecap="round" />
          {/* People working */}
          <path d="M45 80 C 45 65, 55 65, 55 80" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="58" r="6" fill="#1A1A1A" />
          <path d="M155 80 C 155 65, 165 65, 165 80" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="160" cy="58" r="6" fill="#1A1A1A" />
        </svg>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#1A1A1A',
            mb: 1.5,
          }}
        >
          A Platform For Online Earners
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#1A1A1A',
            maxWidth: '340px',
            fontSize: '13.5px',
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          Task Planet Is An Online Money Earning Website For The Individuals Looking For Small Tasks And Getting Paid For It
        </Typography>

        {/* Carousel indicators */}
        <Box sx={{ display: 'flex', gap: 0.8, mt: 3 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1877F2' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFFFFF', opacity: 0.6 }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFFFFF', opacity: 0.6 }} />
        </Box>
      </Box>

      {/* Bottom Half: Login Form Card */}
      <Card
        sx={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          borderRadius: '28px 28px 0 0',
          px: 3.5,
          pt: 4,
          pb: 10, // make space for mock navigation bar
          boxShadow: '0px -8px 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#1A1A1A' }}>
          {isRegistering ? 'Sign Up with TaskPlanet' : 'Login with TaskPlanet'}
        </Typography>
        
        <Typography variant="body2" sx={{ color: '#65676B', mb: 3, fontSize: '13px', lineHeight: 1.4 }}>
          {isRegistering
            ? 'Create an account to start earning points by performing simple tasks and redeem them for real cash rewards!'
            : 'Login to earn points using various amazing and easy tools provided in the app and then use earned points for reward!!'}
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>
            {errorMsg}
          </Alert>
        )}
        
        {infoMsg && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
            {infoMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            {isRegistering && (
              <TextField
                fullWidth
                size="small"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px' } }}
              />
            )}

            <TextField
              fullWidth
              size="small"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px' } }}
            />

            <TextField
              fullWidth
              size="small"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '24px' } }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                borderRadius: '24px',
                py: 1.2,
                mt: 1,
                fontSize: '14.5px',
                fontWeight: 700,
                backgroundColor: '#1877F2',
                '&:hover': {
                  backgroundColor: '#1464CA',
                },
              }}
            >
              {submitting ? 'Connecting...' : isRegistering ? 'Sign Up' : 'Log In'}
            </Button>
          </Box>
        </form>

        {/* Toggle between register/login */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="text"
            onClick={() => setIsRegistering(!isRegistering)}
            sx={{ fontSize: '13px', fontWeight: 700, color: '#1877F2' }}
          >
            {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </Button>
        </Box>

        {/* Continue with Google button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: '24px',
            py: 1.2,
            backgroundColor: '#E8F5E9',
            color: '#2E7D32',
            fontWeight: 700,
            mb: 2,
            border: '1px solid #C8E6C9',
            '&:hover': {
              backgroundColor: '#C8E6C9',
            },
          }}
          startIcon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-3.3-4.53-6.16-4.53z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          }
        >
          Continue With Google
        </Button>

        <Typography variant="body2" align="center" sx={{ fontWeight: 700, color: '#65676B', fontSize: '13px' }}>
          Other Login Method
        </Typography>
      </Card>

      {/* Bottom Mock Tab Bar */}
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderTop: '1px solid #EAEAEA',
          height: 60,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '500px',
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1A1A1A', cursor: 'pointer' }}>
          <Security sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '10px' }}>
            Account Access
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#8E8E8E', cursor: 'pointer' }}>
          <Public sx={{ fontSize: 20 }} />
          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '10px' }}>
            Social
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
