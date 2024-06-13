import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { NavMobile } from "./mobile/nav_mobile";
import { NavDesktopAuthorized } from "./desktop/nav_DeskAuthorized";

export default function NavigationAuth() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return <>{matches ? <NavMobile /> : <NavDesktopAuthorized />}</>;
}
