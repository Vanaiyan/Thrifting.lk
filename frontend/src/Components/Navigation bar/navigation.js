import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { NavDesktop } from "./desktop/nav_desktop";
import { NavMobile } from "./mobile/nav_mobile";

export default function NavBar() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return <>{matches ? <NavMobile /> : <NavDesktop />}</>;
}
