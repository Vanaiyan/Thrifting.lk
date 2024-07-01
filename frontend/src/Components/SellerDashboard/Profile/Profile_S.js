import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material"
import EditProfile from "./EditProfile";

const Profile_S = ({sellerId}) => {
  const [sellerDetails, setSellerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/${sellerId}`, { withCredentials: true });
        setSellerDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching seller details:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchSellerDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading seller details</div>;
  }

  return (
    <Grid>
      <EditProfile seller={sellerDetails}  errors={error} setErrors={setError} />    
    </Grid>
  );
};

export default Profile_S;
