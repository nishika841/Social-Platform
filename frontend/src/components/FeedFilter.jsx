import React from 'react';
import { Box, Chip } from '@mui/material';

const FeedFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { label: 'All Post', value: 'all' },
    { label: 'For You', value: 'for-you' },
    { label: 'Most Liked', value: 'most-liked' },
    { label: 'Most Commented', value: 'most-commented' },
    { label: 'Most Shared', value: 'most-shared' },
  ];

  return (
    <Box
      className="no-scrollbar"
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        py: 1.5,
        px: 2,
        backgroundColor: '#f4f6f9',
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <Chip
            key={filter.value}
            label={filter.label}
            onClick={() => onFilterChange(filter.value)}
            sx={{
              backgroundColor: isActive ? '#1877F2' : '#ffffff',
              color: isActive ? '#ffffff' : '#65676B',
              fontWeight: 600,
              fontSize: '13px',
              border: isActive ? 'none' : '1px solid #E4E6EB',
              px: 1,
              py: 2,
              '&:hover': {
                backgroundColor: isActive ? '#1464CA' : '#F2F3F5',
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default FeedFilter;
