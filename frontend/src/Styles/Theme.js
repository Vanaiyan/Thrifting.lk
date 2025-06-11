// theme.js
import { createTheme } from "@mui/material/styles";

export const Colors = {
  primary: "#ff5003",
  secondary: "242325",

  //pramary shades
  org1: "#FF8841",
  org2: "#FF985C",
  org3: "#ffa570",
  org4: "#FFE9CC",
  org5: "#ffe4d6",
  org6: "#FFF2EB",

  //grey
  Inborder: "#D0D5DD",
  InPholder: "#667085",
  dimgrey: "#696969",
  dovegrey: "#d5d5d5",

  bg: "#fffafa",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5003", // customize primary color
    },
    secondary: {
      main: "#000000", // customize secondary color
    },
  },

  typography: {
    fontFamily: "'Inter', sans-serif",

    title1: {
      fontSize: "36px", // lg
      "@media (max-width: 1280px)": {
        fontSize: "32px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "28px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "24px", // xs
      },
    },
    title2: {
      fontSize: "28px", // lg
      "@media (max-width: 1280px)": {
        fontSize: "20px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "14px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "12px", // xs
      },
    },
    title3: {
      fontSize: "64px", // lg
      "@media (max-width: 1280px)": {
        fontSize: "52px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "48px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "36px", // xs
      },
    },
    subtitle1: {
      fontSize: "18px", // lg
      "@media (max-width: 1280px)": {
        fontSize: "16px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "14px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "14px", // xs
      },
    },
    subtitle2: {
      fontSize: "14px", // lg
      "@media (max-width: 1280px)": {
        fontSize: "14px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "12px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "12px", // xs
      },
    },
    chat1: {
      fontSize: "12px", // lg
      fontWeight: "400",
      "@media (max-width: 1280px)": {
        fontSize: "12px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "12px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "12px", // xs
      },
    },
    subtitle4: {
      fontSize: "12px", // lg
      "@media (max-width: 1280px)": {
        fontSize: "10px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "8px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "6px", // xs
      },
    },
    inputField: {
      fontSize: "16px", // lg
      "@media (max-width: 1280px)": {
        fontSize: "14px", // md
      },
      "@media (max-width: 960px)": {
        fontSize: "12px", // sm
      },
      "@media (max-width: 600px)": {
        fontSize: "10px", // xs
      },
    },
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "Var1" },
          style: {
            fontSize: "14px", // Default font size
            marginBottom: "5%",
            borderRadius: "8px",
            padding: "10px 20px",
            backgroundColor: "#ff5003",
            color: "#fff",
            "@media (max-width:600px)": {
              fontSize: "12px", // Adjusted font size for md screen
              padding: "8px 16px",
              borderRadius: "6px",
            },
          },
        },
      ],
    },
  },
});

export default theme;
