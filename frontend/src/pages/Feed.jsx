import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button, CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext, api } from '../context/AuthContext';
import Header from '../components/Header';
import FeedFilter from '../components/FeedFilter';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import ProfileMenu from '../components/ProfileMenu';
import BottomNav from '../components/BottomNav';

const Feed = () => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [profileOpen, setProfileOpen] = useState(false);

  // Mock static pinned post to match TaskPlanet reference app UI (Nitin Pandey post)
  const pinnedPost = {
    _id: 'pinned_nitin',
    pinned: true,
    user: {
      userId: 'admin_nitin',
      username: 'Nitin Pandey',
      avatar: 'https://ui-avatars.com/api/?name=Nitin+Pandey&background=000&color=fff&size=128&bold=true',
    },
    textContent: `💰 Reward: 100 Points for each valid link.\n🚀 Daily Earning Potential: Up to 1000 Points.\n🚀 Weekly Earning Potential: Up to 10,000.\n🚀 Monthly Earning Potential: Up to 50,000 Points.`,
    imageContent: '', // Optional sub-image or barcode mock
    likes: Array(128).fill({ userId: 'mock', username: 'user' }),
    comments: Array(157).fill({ userId: 'mock', username: 'user', text: 'mock' }),
    createdAt: '2026-05-22T08:00:00.000Z',
  };

  const fetchPosts = async (sortFilter, currentPage = 1, append = false) => {
    setLoading(true);
    try {
      let sortParam = 'newest';
      if (sortFilter === 'most-liked') sortParam = 'most-liked';
      if (sortFilter === 'most-commented') sortParam = 'most-commented';

      const response = await api.get(`/posts?sort=${sortParam}&page=${currentPage}&limit=5`);
      const { posts: fetchedPosts, pages } = response.data;

      if (append) {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      } else {
        setPosts(fetchedPosts);
      }
      setTotalPages(pages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(filter, 1, false);
    setPage(1);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handlePostCreated = async (formData) => {
    try {
      const response = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Add the new post to the top of the feed list
      setPosts((prev) => [response.data, ...prev]);
      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      alert(error.response?.data?.message || 'Error posting content');
      return false;
    }
  };

  // Callback to update specific post when liked or commented on instantly
  const handlePostUpdated = (postId, updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post._id === postId ? updatedPost : post))
    );
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(filter, nextPage, true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#F4F6F9',
        pb: 1, // spacing for footer
      }}
    >
      {/* App Header */}
      <Header user={user} onProfileClick={() => setProfileOpen(true)} />

      {/* Write Post Box */}
      <CreatePost user={user} onPostCreated={handlePostCreated} />

      {/* Horizontal Nav Chips */}
      <FeedFilter activeFilter={filter} onFilterChange={handleFilterChange} />

      {/* Feed Container */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Render pinned post at the top of 'all' feed */}
        {filter === 'all' && page === 1 && (
          <PostCard
            post={pinnedPost}
            currentUser={user}
            onPostUpdated={() => {}} // static pinned card
          />
        )}

        {/* Dynamic Posts */}
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUser={user}
            onPostUpdated={handlePostUpdated}
          />
        ))}

        {/* Loading Spinner */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress size={28} />
          </Box>
        )}

        {/* Load More Button */}
        {!loading && page < totalPages && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Button
              onClick={handleLoadMore}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: '20px',
                px: 3,
                borderColor: '#1877F2',
                color: '#1877F2',
                fontWeight: 700,
              }}
            >
              Load More
            </Button>
          </Box>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
            <Typography variant="body1" sx={{ color: '#888888', fontStyle: 'italic' }}>
              No posts found. Start by writing what's on your mind!
            </Typography>
          </Box>
        )}
      </Box>

      {/* Floating Plus FAB button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 'calc(50% - 225px)', // keep it aligned right relative to mobile wrapper
          '@media (max-width: 500px)': {
            right: 16,
          },
          backgroundColor: '#1877F2',
          '&:hover': { backgroundColor: '#1464CA' },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Bottom Nav Menu */}
      <BottomNav />

      {/* Profile/Logout Drawer */}
      <ProfileMenu
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onSignOut={logout}
      />
    </Box>
  );
};

export default Feed;
