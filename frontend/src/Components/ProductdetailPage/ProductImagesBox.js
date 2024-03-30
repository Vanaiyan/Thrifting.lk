import React, { useState } from 'react';
import Box from '@mui/material/Box';
import nike1 from "./ProductImages/nike1.png"
import nike2 from "./ProductImages/nike2.png"
import nike3 from "./ProductImages/nike3.png"
import nike4 from "./ProductImages/nike4.png"
import nike5 from "./ProductImages/nike5.png"
import nike6 from "./ProductImages/nike6.png"


const ProductImagesBox = () => {
  const [images, setImages] = useState({
    img1: nike1,
    img2: nike2,
    img3: nike3,
    img4: nike4,
    img5: nike5,
    img6: nike6
  });
  const [activeImg, setActiveImage] = useState(images.img1);

  return (
    <Box
      id="Two"
      height={600}
      width={600}
      borderRadius={1}
      sx={{
        // border: '0.7px solid gray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '1px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        id="Three"
        width={500}
        height={450}
        sx={{ overflow: 'hidden', marginBottom: '10px' }}
      >
        <img
          src={activeImg}
          alt="active-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <img
          src={images.img1}
          alt="img-1"
          style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => setActiveImage(images.img1)}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        />
        <img
          src={images.img2}
          alt="img-2"
          style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => setActiveImage(images.img2)}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        />
        <img
          src={images.img3}
          alt="img-3"
          style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => setActiveImage(images.img3)}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        />
        <img
          src={images.img4}
          alt="img-4"
          style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => setActiveImage(images.img4)}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        />
        <img
          src={images.img5}
          alt="img-5"
          style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px',cursor: 'pointer' }}
          onClick={() => setActiveImage(images.img5)}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        />
        <img
          src={images.img6}
          alt="img-6"
          style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => setActiveImage(images.img6)}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        />
      </Box>
    </Box>
  );
};

export default ProductImagesBox;