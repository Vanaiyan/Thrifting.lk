// SellerApprovalCard.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SellerApprovalCard = ({ seller }) => {
  const { firstName, lastName, avatar, email, nicNumber, phoneNumber,addressField } = seller;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getAvatarContent = (name, avatar) => {
    if (avatar) {
      return <Avatar alt={name} src={avatar} />;
    } else {
      const firstLetter = name.charAt(0);
      return <Avatar>{firstLetter}</Avatar>;
    }
  };

  return (
    <div>
      <Card onClick={handleClickOpen} style={{ cursor: 'pointer', marginBottom: '20px' }}>
        <CardHeader
          avatar={getAvatarContent(`${firstName} ${lastName}`, avatar)}
          title={`${firstName} ${lastName}`}
        />
      </Card>

      <Dialog open={open} onClose={handleClose} aria-labelledby="seller-details-dialog">
        <DialogTitle id="seller-details-dialog">Seller Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1"><strong>Name:</strong> {firstName} {lastName}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
          <Typography variant="body1"><strong>NIC Number:</strong> {nicNumber}</Typography>
          <Typography variant="body1"><strong>Phone Number:</strong> {phoneNumber}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {`${addressField.address}, ${addressField.city}, ${addressField.district}, ${addressField.postalCode}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Close</Button>
          <Button onClick={() => { /* Approve logic here */ }} style={{ color: 'green' }}>Approve</Button>
          <Button onClick={() => { /* Reject logic here */ }} style={{ color: 'red' }}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SellerApprovalCard;
