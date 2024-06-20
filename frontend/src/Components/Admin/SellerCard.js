import React, { useState } from 'react';
import { Card, CardHeader, CardActions, IconButton, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {deleteSeller} from '../../Actions/adminActions';

const SellerCard = ({ seller, onDelete }) => {
  const { _id, firstName, lastName, email, avatar } = seller;
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
    } catch (error) {
      console.error('Error deleting seller:', error);
    } finally {
      handleClose();
    }
  };

  return (
    <Card style={{ maxWidth: '350px', height: '100px' }}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
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
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}

export default SellerCard;
