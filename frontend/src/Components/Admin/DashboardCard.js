import React, { useState } from 'react';
import { Grid, Card, Typography, Box, IconButton, Popover, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DashboardCard = ({ title, value, icon, timestamp, showDetailsPath }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton size="small" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose} >
              <MenuItem  component={Link} to={showDetailsPath} onClick={handleClose} sx={{ color: '#ff5003' }}> {/* Use Link component for navigation */}
                   Show Details
              </MenuItem>
            </Menu>
          </Popover>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ff5003',
                color: 'white',
                borderRadius: 2,
                width: 40,
                height: 40,
                marginRight: 2
              }}>
                {icon}
              </Box>
            )}
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Box>
          <Typography variant="subtitle2" color="textSecondary"
            sx={{
              marginTop: 'auto',
              marginBottom: -2
            }}>
            {timestamp}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default DashboardCard;
