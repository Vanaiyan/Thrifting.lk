import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

const ProfilePage = () => {
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile');
        setSeller(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!seller) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container justifyContent="center" style={{ maxWidth: '600px', margin: 'auto' }}>
      <Grid item xs={12}>
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom>Seller Profile</Typography>
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
