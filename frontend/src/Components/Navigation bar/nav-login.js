import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { NavLoginDesktop } from "./desktop/nav-logindesk";
import { NavMobile } from "./mobile/nav_mobile";

export default function NavLogin() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return <>{matches ? <NavMobile /> : <NavLoginDesktop />}</>;
}
