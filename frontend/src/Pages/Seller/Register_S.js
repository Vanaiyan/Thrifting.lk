import React from 'react'
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import RegisterDesk from '../../Components/Register_S/RegisterDesk';
import RegisterMobile from '../../Components/Register_S/RegisterMobile';

export default function Register_S() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    return <>{matches ? <RegisterMobile /> : <RegisterDesk />}</>;
}

  