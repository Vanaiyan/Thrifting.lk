import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import LoginMobile from "../../Components/Login/LoginMobile";
import LoginDesk from "../../Components/Login/LoginDesk";

export default function Login() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return <>{matches ? <LoginMobile /> : <LoginDesk />}</>;
}
