import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, IconButton, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteProduct } from '../../Actions/adminActions';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const ProductCard = ({ product }) => {
  const { _id, name, image, description, seller } = product; // Added _id for product identification
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(_id);
      window.location.reload(); // Reload the page after successful deletion
      alert('Product deleted successfully.');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    } finally {
      handleClose();
    }
  };

  // Check if seller exists before accessing its properties
  const sellerName = seller ? `${seller.firstName} ${seller.lastName}` : 'Unknown Seller';

  return (
    <Card style={{ maxWidth: '400px', height: '200px' }}>
      <CardHeader
        avatar={<Avatar src={ product.pictures && product.pictures.length > 0
          ? product.pictures[0].image
          : ""} />}
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={truncateText(name,70)} // Truncate the title to 50 characters
        subheader={`Seller: ${sellerName}`} 
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {truncateText(description, 200)} {/* Truncate the description to 200 characters */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDelete} sx={{ color: '#ff5003' }}>Delete</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
