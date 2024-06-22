import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Card,
  CardMedia,
  CardActions,
  LinearProgress,
} from "@mui/material";
import { uploadImageToFirebase } from "../../../Actions/sellerAction"; // Import the action

const Form3 = ({ pictures, setPictures, errors = {}, setErrors }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);

    if (pictures.length + files.length > 5) {
      alert("You can only upload up to 5 pictures.");
      return;
    }

    setUploading(true);
    try {
      const uploadedPictures = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await uploadImageToFirebase(file, setProgress);
          return { image: imageUrl, file };
        })
      );
      setPictures((prev) => [...prev, ...uploadedPictures]);
      setErrors((prevErrors) => ({ ...prevErrors, pictures: null }));
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemovePicture = (index) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Five(5) pictures of your item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            disabled={uploading || pictures.length >= 5}
          >
            Upload Files
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {uploading && (
            <LinearProgress variant="determinate" value={progress} />
          )}
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
