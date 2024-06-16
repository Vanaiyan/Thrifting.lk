import React from 'react'
import {
    Box,
    TextField,
    Typography,
    Grid,
  } from "@mui/material";

const Personal_Info = ({firstName,setFirstName,lastName,setLastName,password,setPassword,confirmPassword, setConfirmPassword,errors,email,phoneNumber,setEmail,setPhoneNumber}) => {
  return (
    <div>
         <Grid item lg={12} md={12} xs={12}>
            <Box bgcolor="#fff" p={2}>
            <Typography variant="subtitle1">Personal Information</Typography>
              <Grid lg={12} md={12} xs={12} sx={{display:"flex"}} gap={2}>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName !== undefined}
                helperText={errors.firstName}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName !== undefined}
                helperText={errors.lastName}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              </Grid>
              <Grid lg={12} md={12} xs={12} sx={{display:"flex"}} gap={2}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password !== undefined}
                helperText={errors.password}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword !== undefined}
                helperText={errors.confirmPassword}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              </Grid>
              <Grid lg={12} md={12} xs={12} sx={{display:"flex"}} gap={2}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email !== undefined}
                helperText={errors.email}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
              />
              <TextField
                label="PhoneNumber"
                fullWidth
                margin="normal"
                required
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (/^\d{0,10}$/.test(value)) {
                    setPhoneNumber(value);
                  }
                }}
                error={errors.phoneNumber !== undefined}
                helperText={errors.phoneNumber}
                sx={{ fontSize: "14px", marginBottom: "10px" }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 10,
                  placeholder: "Enter phone number (e.g., 0761234567)",
                }}
              />
              </Grid>
            </Box>
          </Grid>
    </div>
  )
}

export default Personal_Info