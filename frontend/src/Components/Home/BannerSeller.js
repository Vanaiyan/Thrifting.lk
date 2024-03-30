import { Box, Hidden, Typography } from "@mui/material";
import theme from "../../Styles/Theme";
import { SignUpButton } from "../../Styles/NavBar/nav01";
import imglist from "../../Assets/Images/home/sellIt.jpg";
import imgsell from "../../Assets/Images/home/shipIt.png";
import imgpaid from "../../Assets/Images/home/getPaid.png";

export const BannerSeller = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#242325",
          display: "flex",
          justifyContent: "space-around",
          borderRadius: { lg: "45px", md: "30px", sm: "0", xs: "0" },
          height: "350px",
          margin: { lg: "3vw 7vw", md: "2vw", sm: "2vw 0", xs: "2vw 0" },
        }}
      >
        <Box
          sx={{
            padding: "80px 10px",
          }}
        >
          <Typography
            variant="title1"
            sx={{ fontWeight: "600", color: "#ffff" }}
          >
            Earn from your extrasghgfhgf
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fff", marginTop: "10px" }}
          >
            Showcase and sell your goods today.
          </Typography>
          <SignUpButton sx={{ marginTop: "20px", maxHeight: "50px" }}>
            Register as Seller
          </SignUpButton>
        </Box>
        <Hidden mdDown>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "700px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "300px",
                  width: "200px",
                  borderRadius: "30px",
                }}
              >
                <img src={imglist} width={"200px"} />
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", fontWeight: "600" }}
                >
                  List it
                </Typography>
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  Take a few photos. Add a description. Set your price
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "300px",
                  width: "200px",
                  borderRadius: "30px",
                }}
              >
                <img src={imgpaid} width={"200px"} />
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", fontWeight: "600" }}
                >
                  List it
                </Typography>
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  Take a few photos. Add a description. Set your price
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "300px",
                  width: "200px",
                  borderRadius: "30px",
                }}
              >
                <img src={imgsell} width={"200px"} />
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", fontWeight: "600" }}
                >
                  List it
                </Typography>
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  Take a few photos. Add a description. Set your price
                </Typography>
              </Box>
            </Box>
          </Box>
        </Hidden>
      </Box>
    </div>
  );
};
