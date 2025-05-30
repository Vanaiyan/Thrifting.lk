// ProductDescriptionBox.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProductDescriptionBox = () => {
  return (
    <Box id="Two"
      height={430}
      width={600}
      borderRadius={1}
      sx={{
        // border: '1px solid gray',
        paddingLeft: '20px',
        paddingTop: '4px',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant='subtitle2' sx={{ fontWeight: '600', paddingTop: '5px', fontSize: '18px', color: '#505050' }}>
        About this Item
      </Typography>
      <Typography variant='body2' sx={{ fontWeight: 500, paddingTop: '5px', paddingLeft: '20px', fontSize: '16px', color: '#8B96A5' }}>
        <ul>
            <li style={{ marginBottom: '0.5rem' }}>The Nike Zoom Metcon Turbo 2 puts a shot of adrenalizing speed into your everyday workout. It combines stability and responsiveness in a lightweight package to help you move quickly during circuit training</li>
            <li style={{ marginBottom: '0.5rem' }}>Zoom Air is lightweight and responsive for quick, repetitive movements like box jumps and double-unders. You get spring when you take off, and cushioning when you land.</li>
            <li style={{ marginBottom: '0.5rem' }}>The instep of the upper is thin and lightweight, but still tough, to handle abrasion. Mesh on the outer part keeps it breathable during high-heat sets.</li>
            <li style={{ marginBottom: '0.5rem' }}>The features you love, like the rope wrap and handstand heel clip, have been redesigned and pared down, to shave off grams.</li>
            <li style={{ marginBottom: '0.5rem' }}>Wide, flat heel helps keep you stable. & Grippy rubber sole is flexible to let your foot bend comfortably. & Country/Region of Origin: Vietnam</li>
        </ul>
      </Typography>
      
    </Box>
  );
};

export default ProductDescriptionBox;
