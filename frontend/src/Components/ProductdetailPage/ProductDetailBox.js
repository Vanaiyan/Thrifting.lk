import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';

const labels = {
  0.5: '1.0',
  1: '2.0',
  1.5: '3.0',
  2: '4.0',
  2.5: '5.0',
  3: '6.0',
  3.5: '7.0',
  4: '8.0',
  4.5: '9.0',
  5: '10.0',
};



const ProductDetailBox = () => {

  const value = 3.5;

  const [saved, setSaved] = useState(false);

  const handleSaveToggle = () => {
    setSaved(!saved);
  };

  return (
    <Box id="Four"
      width={400}
      height={550}
      sx={{
        // border: '1px solid gray',
        boxSizing: 'border-box',
        marginLeft: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Box>
        <Typography 
            variant='h5'
            sx={{fontWeight: 600, paddingTop: '5px', fontSize: '26px'}}>
            Nike Zoom Metcon Turbo 2
        </Typography>
        <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
            Men's Workout Shoes
        </Typography>

        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            color: '#FF9017',
          }}
        >
          <Rating
            name="text-feedback"
            size="small"
            value={value}
            readOnly
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Box sx={{ ml: 2 }}>{labels[value]}</Box>
        </Box>

        <Divider variant="middle" sx={{marginTop: '20px', marginBottom: '10px'}} />

        <Typography 
            variant='subtitle1'
            sx={{fontWeight: 600, color: '#FA3434', marginTop: '15px',marginBottom: '20px', fontSize: "15px"}}>
            Rs. 14 999.00 LKR
        </Typography>
        
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#8B96A5', fontSize: "15px" }}>Price:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#505050', fontSize: "15px" }}>Negotiable</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#8B96A5', fontSize: "15px" }}>Size:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#505050', fontSize: "15px" }}>42</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#8B96A5', fontSize: "15px" }}>Gender:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#505050', fontSize: "15px" }}>Men</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#8B96A5', fontSize: "15px" }}>Category:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#505050', fontSize: "15px" }}>Shoes & Footwear</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#8B96A5', fontSize: "15px" }}>Protection:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#505050', fontSize: "15px" }}>Refund Policy</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#8B96A5', fontSize: "15px" }}>Price:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#505050', fontSize: "15px" }}>Negotiable</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2" sx={{ fontWeight: 400, color: '#8B96A5', fontSize: "15px" }}>Price:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" sx={{ fontWeight: 400, color: '#505050', fontSize: "15px" }}>Negotiable</Typography>
          </Grid>
          
        </Grid>
        <Divider variant="middle" sx={{marginTop: '20px', marginBottom: '10px'}} />
      </Box> <br />


      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<AddShoppingCartIcon />} sx={{height: '35px', width: '180px'}}>
          Add to Cart   
        </Button>
        <Button variant="outlined" startIcon={saved ? <FavoriteIcon /> : <FavoriteBorderIcon />} onClick={handleSaveToggle} sx={{height: '35px', width: '180px'}}>
          Save for later
        </Button>
      </Stack>


    </Box>
  );
};

export default ProductDetailBox;
