import React, { useState } from 'react';
import { Card, CardHeader, CardActions, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteSeller, warnSeller } from '../../Actions/adminActions';

const SellerCard = ({ seller, onDelete }) => {
  const { _id, firstName, lastName, email, image } = seller;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await deleteSeller(_id);
      onDelete(_id);
      window.location.reload(); // Reload the page immediately
    } catch (error) {
      console.error('Error deleting seller:', error);
    } finally {
      handleClose();
    }
  };

  const handleWarning = async () => {
    try {
      await warnSeller(_id);
      console.log("Warning email sent successfully");
      window.location.reload(); // Reload the page immediately
    } catch (error) {
      console.error('Error sending warning email:', error);
    } finally {
      handleClose();
    }
  };

  // Function to generate a random background color
  const getRandomColor = () => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <Card style={{ maxWidth: '350px', height: '100px' }}>
      <CardHeader
        avatar={
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={image}
            sx={{
              bgcolor: image ? undefined : getRandomColor(), // Set random background color if avatar is not available
            }}
          >
            {!image && `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
          </Avatar>
        }
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={`Name: ${firstName} ${lastName}`}
        subheader={`Email: ${email}`}
      />
      <CardActions disableSpacing>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDelete} sx={{ color: '#ff5003' }}>Delete</MenuItem>
          <MenuItem onClick={handleWarning} sx={{ color: '#ff5003' }}>Warning</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}

export default SellerCard;
