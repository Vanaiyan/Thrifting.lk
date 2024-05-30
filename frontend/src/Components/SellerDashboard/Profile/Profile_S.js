import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import EditProf from "./EditProf";

const Profile_S = () => {
  const [sellerDetails, setSellerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/6658263ee302c74e3e3617d8`
        );
        // const response = await axios.get(`http://localhost:8000/api/profile/${seller._id}`);
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
      <EditProf seller={sellerDetails}  />
    </Grid>
  );
};

export default Profile_S;
