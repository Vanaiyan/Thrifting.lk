// src/components/WelcomeSection.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const ImageSection = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Box
        component="img"
        src="/images/admin.png"
        alt="Welcome"
        sx={{ maxWidth: '100%', height: 'auto', marginBottom: 2 }}
      />
    </Box>
  );
};

export default ImageSection;
