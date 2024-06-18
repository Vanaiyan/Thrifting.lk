import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";

const Form1 = ({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  gender,
  setGender,
  errors = {},
}) => {
  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Fill in the basic information about your item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ fontSize: "14px", marginBottom: "10px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={
              errors.description ||
              "Please include product physical features and necessary details."
            }
            sx={{ fontSize: "14px", marginBottom: "10px" }}
            multiline
            rows={6} // Increase the number of rows for more height
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            sx={{ fontSize: "14px", marginBottom: "10px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">LKR</InputAdornment>
              ),
              inputProps: { min: 0 },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            margin="normal"
            required
            error={!!errors.gender}
          >
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
              sx={{ fontSize: "14px", marginBottom: "10px" }}
            >
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="unisex">Unisex</MenuItem>
            </Select>
            {errors.gender && (
              <Typography color="error" variant="caption">
                {errors.gender}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Form1;
