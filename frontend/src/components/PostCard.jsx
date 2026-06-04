import React, { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  TextField,
  Collapse,
  Tooltip,
} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import PushPin from '@mui/icons-material/PushPin';
import SentimentSatisfied from '@mui/icons-material/SentimentSatisfied';
import Send from '@mui/icons-material/Send';
import { api } from '../context/AuthContext';


const PostCard = ({ post, currentUser, onPostUpdated }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Check if current user liked the post
  const isLiked = post.likes.some((like) => like.userId === currentUser?._id);

  const handleLikeToggle = async () => {
    if (!currentUser) return;

    // Optimistic UI update: instantly update parent state
    const updatedLikes = isLiked
      ? post.likes.filter((like) => like.userId !== currentUser._id)
      : [...post.likes, { userId: currentUser._id, username: currentUser.username }];

    onPostUpdated(post._id, { ...post, likes: updatedLikes });

    try {
      const response = await api.post(`/posts/${post._id}/like`);
      // Update with server actual response
      onPostUpdated(post._id, { ...post, likes: response.data });
    } catch (error) {
      console.error('Error toggling like:', error);
      // Rollback on failure
      onPostUpdated(post._id, post);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser || submittingComment) return;

    setSubmittingComment(true);
    const originalComments = [...post.comments];

    // Optimistic UI update
    const tempComment = {
      _id: Date.now().toString(), // temp id
      userId: currentUser._id,
      username: currentUser.username,
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
    };

    onPostUpdated(post._id, {
      ...post,
      comments: [...post.comments, tempComment],
    });
    setCommentText('');

    try {
      const response = await api.post(`/posts/${post._id}/comment`, {
        text: tempComment.text,
      });
      // Update with server actual comments
      onPostUpdated(post._id, { ...post, comments: response.data });
    } catch (error) {
      console.error('Error adding comment:', error);
      // Rollback on failure
      onPostUpdated(post._id, { ...post, comments: originalComments });
    } finally {
      setSubmittingComment(false);
    }
  };

  // Format date readable
  const formatPostTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 6000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${Math.floor(diffMins / 60)}h ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Generate names list for like tooltip
  const getLikesTooltipText = () => {
    if (post.likes.length === 0) return 'No likes yet';
    const names = post.likes.map((l) => l.username);
    if (names.length <= 5) return `Liked by: ${names.join(', ')}`;
    return `Liked by: ${names.slice(0, 5).join(', ')} and ${names.length - 5} others`;
  };

  return (
    <Card
      sx={{
        mx: 2,
        my: 1.5,
        p: 2,
        border: post.pinned ? '2px solid #F0B90B' : '1px solid #E4E6EB',
        position: 'relative',
      }}
    >
      {/* Pinned post badge */}
      {post.pinned && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFBE6',
            border: '1px solid #FFE58F',
            borderRadius: '12px',
            px: 1,
            py: 0.2,
            gap: 0.2,
          }}
        >
          <PushPin sx={{ fontSize: 12, color: '#F0B90B' }} />
          <Typography variant="caption" sx={{ fontSize: '10px', color: '#B78103', fontWeight: 700 }}>
            PINNED
          </Typography>
        </Box>
      )}

      {/* User Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar src={post.user?.avatar} sx={{ width: 44, height: 44 }}>
            {post.user?.username?.slice(0, 2).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {post.user?.username}
              <Typography variant="caption" sx={{ color: '#888888', fontWeight: 500 }}>
                @{post.user?.username?.toLowerCase()}
              </Typography>
            </Typography>
            <Typography variant="caption" sx={{ color: '#888888' }}>
              {formatPostTime(post.createdAt)}
            </Typography>
          </Box>
        </Box>

        {!post.pinned && (
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              px: 2.5,
              py: 0.4,
              border: '1.5px solid #1877F2',
              color: '#1877F2',
              '&:hover': {
                border: '1.5px solid #1464CA',
                backgroundColor: 'rgba(24, 119, 242, 0.04)',
              },
            }}
          >
            Follow
          </Button>
        )}
      </Box>

      {/* Text Content */}
      {post.textContent && (
        <Typography variant="body1" sx={{ color: '#1A1A1A', mb: 2, fontSize: '14.5px', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {post.textContent}
        </Typography>
      )}

      {/* Post Image */}
      {post.imageContent && (
        <Box
          sx={{
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#F0F2F5',
            mb: 2,
            maxHeight: '350px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${post.imageContent}`}
            alt="Post Content"
            style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none'; // hide if broken image
            }}
          />
        </Box>
      )}

      {/* Divider */}
      <Box sx={{ borderBottom: '1px solid #F0F2F5', my: 1 }} />

      {/* Action Footer Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Like Button */}
        <Tooltip title={getLikesTooltipText()} arrow>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLikeToggle} size="small" sx={{ color: isLiked ? '#D32F2F' : '#65676B' }}>
              {isLiked ? <Favorite sx={{ fontSize: 20 }} /> : <FavoriteBorder sx={{ fontSize: 20 }} />}
            </IconButton>
            <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 700, color: '#65676B', fontSize: '13px' }}>
              {post.likes.length}
            </Typography>
          </Box>
        </Tooltip>

        {/* Comment toggle button */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setShowComments(!showComments)} size="small" sx={{ color: '#65676B' }}>
            <ChatBubbleOutline sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 700, color: '#65676B', fontSize: '13px' }}>
            {post.comments.length}
          </Typography>
        </Box>

        {/* Share button */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" sx={{ color: '#65676B' }}>
            <ShareOutlined sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 700, color: '#65676B', fontSize: '13px' }}>
            0
          </Typography>
        </Box>
      </Box>

      {/* Collapsible Comments Section */}
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #F0F2F5' }}>
          {/* Comments List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxvh: '250px', overflowY: 'auto', mb: 2 }}>
            {post.comments.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#888888', fontStyle: 'italic', textAlign: 'center', py: 1 }}>
                No comments yet. Be the first to comment!
              </Typography>
            ) : (
              post.comments.map((comment) => (
                <Box key={comment._id} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <Avatar sx={{ width: 28, height: 28, fontSize: '12px', backgroundColor: '#1877F2' }}>
                    {comment.username.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Box
                    sx={{
                      backgroundColor: '#F0F2F5',
                      borderRadius: '12px',
                      px: 1.5,
                      py: 0.8,
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '12px', color: '#1A1A1A' }}>
                      {comment.username}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '13px', color: '#1A1A1A', mt: 0.2 }}>
                      {comment.text}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Add Comment Input Row */}
          {currentUser && (
            <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Avatar src={currentUser.avatar} sx={{ width: 28, height: 28 }} />
              <TextField
                size="small"
                fullWidth
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                InputProps={{
                  sx: {
                    borderRadius: '20px',
                    backgroundColor: '#F0F2F5',
                    fontSize: '13px',
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
              <IconButton type="submit" disabled={!commentText.trim() || submittingComment} sx={{ color: '#1877F2' }}>
                <Send sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Collapse>
    </Card>
  );
};

export default PostCard;
