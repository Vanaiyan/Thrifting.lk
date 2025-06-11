// AppBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import { Colors } from '../../Styles/Theme';
import { grey } from '@mui/material/colors';

const AppBarAdmin = ({ adminName, adminAvatar }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: grey[200]  }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" color={"black"} sx={{ml:"250px"}}>
          Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={adminName} src={adminAvatar} sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle2" sx={{ ml:"10px",color: "black", marginRight: '10px' }}>
            {adminName} Kirupanantha Aruran
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarAdmin;
