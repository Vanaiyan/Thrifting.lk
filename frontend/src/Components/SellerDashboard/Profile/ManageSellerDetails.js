import React from "react";
import { Grid, Hidden } from "@mui/material";
import editImage from ".//../../../Assets/Images/sellerDashboard/editProfile.png";
import EditForm from "./EditForm";

const ManageSellerDetails = () => {
  return (
    <Grid container my={5} spacing={2} padding={"20px 100px"}>
      <Hidden mdDown>
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={editImage}
            alt="Edit Profile"
            style={{ maxWidth: "100%" }}
          />
        </Grid>
      </Hidden>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "whitesmoke",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <EditForm />
      </Grid>
    </Grid>
  );
};

export default ManageSellerDetails;
