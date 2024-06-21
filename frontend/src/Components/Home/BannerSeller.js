import { Box, Hidden, Typography } from "@mui/material";
import { SignUpButton } from "../../Styles/NavBar/nav01";
import imglist from "../../Assets/Images/home/sellIt.jpg";
import imgpaid from "../../Assets/Images/home/getPaid.png";
import imgcustomer from "../../Assets/Images/home/customer.png";
import { useNavigate } from "react-router-dom";

export const BannerSeller = () => {

  const navigate = useNavigate();
  const handleSignupButton =()=>{
    navigate('/seller/register');
  }

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
            Earn from your extras
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fff", marginTop: "10px" }}
          >
            Showcase and sell your goods today.
          </Typography>
          <SignUpButton sx={{ marginTop: "20px", maxHeight: "50px" }} onClick={handleSignupButton}>
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
                  height: "250px",
                  width: "200px",
                  borderRadius: "30px",
                }}
              >
                <img src={imglist} width={"200px"} height={"200px"} />
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", fontWeight: "600" }}
                >
                  List Product
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "250px",
                  width: "200px",
                  borderRadius: "30px",
                }}
              >
                <img src={imgpaid} width={"200px"} height={"200px"} />
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", fontWeight: "600" }}
                >
                  Set Price and Details
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "250px",
                  width: "200px",
                  borderRadius: "30px",
                }}
              >
                <img
                  src={imgcustomer}
                  width={"200px"}
                  height={"200px"}
                  style={{
                    borderTopLeftRadius: "30px",
                    borderTopRightRadius: "30px"
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", fontWeight: "600" }}
                >
                  Connect with Buyer
                </Typography>
              </Box>
            </Box>
          </Box>
        </Hidden>
      </Box>
    </div>
  );
};
