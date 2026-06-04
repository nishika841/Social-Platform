import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  IconButton,
  Button,
  ButtonGroup,
  Avatar,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SentimentSatisfiedAlt from '@mui/icons-material/SentimentSatisfiedAlt';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import Campaign from '@mui/icons-material/Campaign';
import Send from '@mui/icons-material/Send';
import Close from '@mui/icons-material/Close';


const CreatePost = ({ onPostCreated, user }) => {
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [subTab, setSubTab] = useState('all'); // 'all' or 'promotions'
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textContent.trim() && !imageFile) return;

    // Build form data for multipart/form-data upload
    const formData = new FormData();
    formData.append('textContent', textContent);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const success = await onPostCreated(formData);
    if (success) {
      setTextContent('');
      clearImage();
    }
  };

  return (
    <Card
      sx={{
        mx: 2,
        mt: 1,
        p: 2,
        border: '1px solid #E4E6EB',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1A1A1A' }}>
          Create Post
        </Typography>

        {/* Sub-tabs toggle */}
        <Box
          sx={{
            backgroundColor: '#F0F2F5',
            borderRadius: '20px',
            p: '2px',
            display: 'flex',
            gap: 0.5,
          }}
        >
          <Button
            size="small"
            onClick={() => setSubTab('all')}
            sx={{
              borderRadius: '20px',
              px: 2,
              py: 0.5,
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: subTab === 'all' ? '#1877F2' : 'transparent',
              color: subTab === 'all' ? '#ffffff' : '#65676B',
              '&:hover': {
                backgroundColor: subTab === 'all' ? '#1464CA' : 'transparent',
              },
            }}
          >
            All Posts
          </Button>
          <Button
            size="small"
            onClick={() => setSubTab('promotions')}
            sx={{
              borderRadius: '20px',
              px: 2,
              py: 0.5,
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: subTab === 'promotions' ? '#1877F2' : 'transparent',
              color: subTab === 'promotions' ? '#ffffff' : '#65676B',
              '&:hover': {
                backgroundColor: subTab === 'promotions' ? '#1464CA' : 'transparent',
              },
            }}
          >
            Promotions
          </Button>
        </Box>
      </Box>

      {/* Input Row */}
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Avatar src={user?.avatar} sx={{ width: 40, height: 40 }} />
        <TextField
          multiline
          rows={2}
          fullWidth
          variant="standard"
          placeholder="What's on your mind?"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: '15px' },
          }}
        />
      </Box>

      {/* Image Preview Block */}
      {imagePreview && (
        <Box
          sx={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #E4E6EB',
            maxHeight: '200px',
            backgroundColor: '#000000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
          />
          <IconButton
            size="small"
            onClick={clearImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: '#ffffff',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Divider */}
      <Box sx={{ borderBottom: '1px solid #EAEAEA' }} />

      {/* Action Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <IconButton
            onClick={() => fileInputRef.current.click()}
            size="medium"
            sx={{ color: '#1877F2' }}
          >
            <PhotoCamera sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton size="medium" sx={{ color: '#F0B90B' }}>
            <SentimentSatisfiedAlt sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton size="medium" sx={{ color: '#555555' }}>
            <FormatListBulleted sx={{ fontSize: 22 }} />
          </IconButton>

          <Button
            size="small"
            startIcon={<Campaign sx={{ fontSize: 18 }} />}
            sx={{
              color: '#1877F2',
              fontSize: '13px',
              fontWeight: 700,
              ml: 1,
            }}
          >
            Promote
          </Button>
        </Box>

        {/* Post Button */}
        <Button
          onClick={handleSubmit}
          disabled={!textContent.trim() && !imageFile}
          variant="contained"
          endIcon={<Send />}
          sx={{
            borderRadius: '24px',
            px: 3,
            py: 0.8,
            fontSize: '13px',
            backgroundColor: (textContent.trim() || imageFile) ? '#1877F2' : '#E4E6EB',
            color: (textContent.trim() || imageFile) ? '#ffffff' : '#B0B3B8',
            '&:hover': {
              backgroundColor: '#1464CA',
            },
          }}
        >
          Post
        </Button>
      </Box>
    </Card>
  );
};

export default CreatePost;
