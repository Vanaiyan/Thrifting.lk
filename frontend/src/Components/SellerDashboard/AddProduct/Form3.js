import React from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";

const Form3 = ({ pictures, setPictures, errors = {} }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPictures((prev) => [
      ...prev,
      ...files.map((file) => ({
        image: URL.createObjectURL(file),
        file,
      })),
    ]);
  };

  const handleRemovePicture = (index) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add pictures of your item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload Files
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {errors.pictures && (
            <Typography color="error">{errors.pictures}</Typography>
          )}

          <Grid container spacing={1} style={{ marginTop: "10px" }}>
            {pictures.map((picture, index) => (
              <Grid item key={index}>
                <Card sx={{ maxWidth: 200 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={picture.image}
                    alt={`Uploaded Image ${index + 1}`}
                  />
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleRemovePicture(index)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Form3;
