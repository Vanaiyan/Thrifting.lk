import { Box, Typography } from "@mui/material";
import li1 from "../../Assets/Images/sellerPage/li1.png";
import li2 from "../../Assets/Images/sellerPage/li2.png";
import li3 from "../../Assets/Images/sellerPage/li3.png";
import li4 from "../../Assets/Images/sellerPage/li4.png";

export const List = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderRadius: { lg: "45px", md: "30px", sm: "0", xs: "0" },
          height: "350px",
          margin: { lg: "3vw 7vw", md: "2vw", sm: "2vw 0", xs: "2vw 0" },
        }}
      >
        <Box
          sx={{
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ListItem img={li1} alt="No register fee" text="No register fee" />

          <ListItem
            img={li2}
            alt="Over 100k Customers"
            text="Over 100k Customers"
          />

          <ListItem
            img={li3}
            alt="Convenient Shipping methods"
            text="Convenient Shipping methods"
          />
          <ListItem
            img={li4}
            alt="Reduce cost of doing business"
            text="Reduce cost of doing business"
          />
        </Box>
      </Box>
    </div>
  );
};

const ListItem = ({ img, alt, text }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFE9CC",
        height: "320px",
        width: "250px",
        borderRadius: "30px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={img}
        alt={alt}
        style={{ width: "250px", height: "250px", borderRadius: "30px" }}
      />
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "600",
          marginTop: "10px",
          wordWrap: "break-word",
          minHeight: "70px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
