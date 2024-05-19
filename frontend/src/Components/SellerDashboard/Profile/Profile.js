import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Grid, Typography } from '@mui/material';

const ProfilePage = ({ seller }) => {
  if (!seller) {
    return <div>Loading...</div>;
  }
  const firstLetter_firstName = seller.firstName ? seller.firstName.charAt(0) : '';
  const firstLetter_lastName = seller.lastName ? seller.lastName.charAt(0) : '';
  return (
    <Grid container justifyContent="center" style={{ maxWidth: '600px', margin: 'auto' }}>
      <Grid item xs={3}>
        <Avatar  sx={{ width: 100, height: 100 }}>{`${firstLetter_firstName}${firstLetter_lastName}`}</Avatar>
      </Grid>
      <Grid item xs={9}>
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Name:</strong> {seller.firstName} {seller.lastName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Email:</strong> {seller.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Phone Number:</strong> {seller.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Address:</strong> {seller.addressField.address}, {seller.addressField.city}, {seller.addressField.district}, {seller.addressField.postalCode}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>NIC Name:</strong> {seller.nicName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>NIC Number:</strong> {seller.nicNumber}</Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
