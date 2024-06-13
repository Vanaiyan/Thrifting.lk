import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import img1 from "../../Assets/Images/sellerPage/steps_img1.png";

export const Steps = () => {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      padding={"0 50px"}
      bgcolor={"#FFE9CC"}
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            backgroundColor: "#FFE9CC",
            p: 2,
            borderRadius: 2,
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="title4"
            sx={{
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Steps to sell in Thrifting.lk
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Item
              number={1}
              text={"List Product"}
              icon={<ListIcon sx={{ color: "#000000" }} />}
            />
            <Item
              number={2}
              text={"Set Price and Details"}
              icon={<MonetizationOnOutlinedIcon sx={{ color: "#000000" }} />}
            />
            <Item
              number={3}
              text={"Connect with Buyer"}
              icon={
                <ConnectWithoutContactOutlinedIcon sx={{ color: "#000000" }} />
              }
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src={img1} alt="" style={{ width: "100%", height: "600px" }} />
      </Grid>
    </Grid>
  );
};

export const Item = ({ number, text, icon }) => {
  return (
    <Box
      sx={{
        color: "white",
        backgroundColor: "black",
        borderRadius: 2,
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle5">
        {number} {text}
      </Typography>
      <Box
        sx={{
          color: "white",
          backgroundColor: "black",
          borderRadius: "50%",
          p: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "50%",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Box>
  );
};
