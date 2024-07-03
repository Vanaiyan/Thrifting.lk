import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { BlurOverlay } from "./../../../Styles/SellerPage/ProductManageStyle";

const Product = ({
  id,
  name,
  price,
  imageSrcs,
  description,
  discount,
  setProducts,
  setSnackbar,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editDiscount, setEditDiscount] = useState(discount);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageSrcs.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageSrcs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleDescription = () => {
    setShowFullDescription((prevShow) => !prevShow);
  };

  const handleEditProduct = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (editDiscount >= price) {
      setSnackbar({
        open: true,
        message: "Discount cannot be greater than or equal to the price",
        severity: "error",
      });
      return;
    }

    try {
      const updatedProduct = {
        name: editName,
        description: editDescription,
        discount: editDiscount,
      };

      // Send the updated product details in the request body
      const response = await axios.put(
        `http://localhost:8000/api/products/${id}`,
        updatedProduct,
        { withCredentials: true }
      );

      // Update products state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, ...updatedProduct } : product
        )
      );

      // console.log("Product updated successfully");
      // console.log(response.data.product);
      setSnackbar({
        open: true,
        message: "Product updated successfully",
        severity: "success",
      });
      setEditMode(false);
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      setSnackbar({
        open: true,
        message: "Error updating product",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    setEditName(name);
    setEditDescription(description);
    setEditDiscount(discount);
    setEditMode(false);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteDialogOpen(false);
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        withCredentials: true,
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setSnackbar({
        open: true,
        message: "Product deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response ? error.response.data : error.message
      );
      setSnackbar({
        open: true,
        message: "Error deleting product",
        severity: "error",
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      {editMode && <BlurOverlay />}
      <Card
        style={{
          position: "relative",
          zIndex: editMode ? 3 : 1,
          width: editMode ? "400px" : "240px",
        }}
      >
        <div style={{ position: "relative", borderRadius: "20px" }}>
          <IconButton
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <div style={{ padding: "10px" }}>
            <CardMedia
              component="img"
              height="200px"
              width="200px"
              image={imageSrcs[currentImageIndex]}
              alt={`Product image ${currentImageIndex + 1}`}
              sx={{ borderRadius: "20px" }}
            />
          </div>
          <IconButton
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <CardContent className={editMode ? "blur" : ""}>
          {editMode ? (
            <>
              <TextField
                label="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={price}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                label="Discount"
                value={editDiscount}
                onChange={(e) => setEditDiscount(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button size="small" onClick={handleSave}>
                Save
              </Button>
              <Button size="small" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5">{truncate(editName, 10)}</Typography>

              <Typography variant="body2" color="textSecondary">
                {showFullDescription
                  ? description
                  : `${description.substring(0, 50)}...`}
              </Typography>
              <Button size="small" onClick={toggleDescription}>
                {showFullDescription ? "See Less" : "See More"}
              </Button>

              {showFullDescription ? (
                <>
                  <Typography variant="h6">LKR {price}</Typography>
                  {discount ? (
                    <Typography variant="body2" color="error">
                      Discount: LKR {discount}
                    </Typography>
                  ) : null}
                </>
              ) : (
                <Typography variant="h6">LKR {price - discount}</Typography>
              )}
            </>
          )}
          {!editMode && (
            <>
              <Button size="small" onClick={handleEditProduct}>
                Edit
              </Button>
              <Button size="small" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Product;
