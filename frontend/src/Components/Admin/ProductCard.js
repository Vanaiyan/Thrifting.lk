// ProductCard.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProductCard = ({ product }) => {
  const { name, image, description, seller } = product;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Handle delete functionality
  };

  return (
    <Card style={{ maxWidth: '400px', height:'200px' }}> {/* Set the max width of the card */}
      <CardHeader
        avatar={<Avatar src={image} />}
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`Seller: ${seller}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
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

export default ProductCard;
