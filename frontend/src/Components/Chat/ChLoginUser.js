import { Box, Grid } from "@material-ui/core";
import React from "react";
import { Colors } from "../../Styles/Theme";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
const ChLoginUser = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return null; // or handle the case when loginUser is null
  }
  return (
    <Box
      height={"60px"}
      sx={{
        color: Colors.orgchat,
        padding: "10px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        margin: " 0 10px",
      }}
    >
      <Grid container>
        <Avatar
          src="/path/to/avatar-image.jpg"
          alt="Avatar"
          sx={{
            cursor: "pointer",
            border: "2px solid",
            borderColor: Colors.orgchat,
            marginRight: "15px",
          }}
        />
        <Box>
          <Typography fontSize={14} fontWeight={600} color={Colors.org1}>
            {user.firstName}
          </Typography>
          <Typography fontSize={12} color={Colors.orgchatsub}>
            {user.lastName}{" "}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default ChLoginUser;
