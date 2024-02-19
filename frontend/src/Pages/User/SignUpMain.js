import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import SignUpDesk from "../../Components/Sign-up/SignUpDesk";
import SignUpMobile from "../../Components/Sign-up/SignUpMobile";

export default function SignUp() {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return <>{matches ? <SignUpMobile /> : <SignUpDesk />}</>;
}
