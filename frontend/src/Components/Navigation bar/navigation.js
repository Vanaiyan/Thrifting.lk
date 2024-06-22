import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux"; // Import useSelector
import { NavDesktop } from "./desktop/nav_desktop";
import { NavDesktopAuthorized } from "./desktop/nav_DeskAuthorized"; // Assuming this is the correct path
import { NavMobile } from "./mobile/nav_mobile";

export default function NavBar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access the auth state
  const user = useSelector((state) => state.auth.user); // Access the auth state
  const role = user ? user.role : 0;
  if (matches) {
    return <NavMobile />;
  } else {
    return isAuthenticated && role == "User" ? (
      <NavDesktopAuthorized />
    ) : (
      <NavDesktop />
    );
  }
}
