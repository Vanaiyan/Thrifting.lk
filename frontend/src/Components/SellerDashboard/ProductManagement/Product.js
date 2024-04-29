import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { StyledGrid } from "../../../Styles/SellerPage/ProductManageStyle";

const Product = ({ id, title, price, imageSrc, description }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = () => {
    console.log(`Edit product ${id}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <StyledGrid container justifyContent="center" alignItems="center">
        <Grid>
          <img
            src={imageSrc}
            alt={title}
            style={{ width: "250px", height: "250px", borderRadius: "10px" }}
          />
        </Grid>

        <Grid>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{`$${price}`}</Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            View More
          </Button>
        </Grid>
      </StyledGrid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <img
            src={imageSrc}
            alt={title}
            style={{ width: "300px", height: "300px" }}
          />
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body1">{`$${price}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} color="primary">
            Edit
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Product;
