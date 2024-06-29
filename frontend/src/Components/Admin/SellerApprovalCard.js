import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { approveSeller, rejectSeller } from "../../Actions/adminActions"; // Adjust the path as needed

const SellerApprovalCard = ({ seller }) => {
  const {
    _id,
    firstName,
    lastName,
    avatar,
    email,
    nicNumber,
    phoneNumber,
    addressField,
    frontImage,
    backImage,
  } = seller;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async () => {
    try {
      await approveSeller(_id);
      window.location.reload(); // Reload the webpage
    } catch (error) {
      console.error("Error approving seller:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectSeller(_id);
      window.location.reload(); // Reload the webpage
    } catch (error) {
      console.error("Error rejecting seller:", error);
    }
  };

  // Function to generate a random background color
  const getRandomColor = () => {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Function to determine avatar content based on availability
  const getAvatarContent = () => {
    if (avatar) {
      return <Avatar alt={`${firstName} ${lastName}`} src={avatar} />;
    } else {
      const firstLetter = `${firstName.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`;
      const backgroundColor = getRandomColor();
      return <Avatar sx={{ bgcolor: backgroundColor }}>{firstLetter}</Avatar>;
    }
  };

  return (
    <div>
      <Card
        onClick={handleClickOpen}
        style={{ cursor: "pointer", marginBottom: "20px" }}
      >
        <CardHeader
          avatar={getAvatarContent()}
          title={`${firstName} ${lastName}`}
        />
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="seller-details-dialog"
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            maxHeight: "80vh",
            height: "80vh",
          },
        }}
      >
        <DialogTitle id="seller-details-dialog">Seller Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Name:</strong> {firstName} {lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body1">
            <strong>NIC Number:</strong> {nicNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Phone Number:</strong> {phoneNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong>{" "}
            {`${addressField.address}, ${addressField.city}, ${addressField.district}, ${addressField.postalCode}`}
          </Typography>
          {frontImage && (
            <div>
              <Typography variant="body1">
                <strong>NIC Front Image:</strong>
              </Typography>
              <Box
                component="img"
                src={frontImage}
                alt="NIC Front"
                sx={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  display: "block",
                  margin: "10px auto",
                }}
              />
            </div>
          )}
          {backImage && (
            <div>
              <Typography variant="body1">
                <strong>NIC Back Image:</strong>
              </Typography>
              <Box
                component="img"
                src={backImage}
                alt="NIC Back"
                sx={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  display: "block",
                  margin: "10px auto",
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleApprove} style={{ color: "green" }}>
            Approve
          </Button>
          <Button onClick={handleReject} style={{ color: "red" }}>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SellerApprovalCard;
