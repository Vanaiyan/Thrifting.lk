// import React from 'react';
// import { Box, Typography } from '@mui/material';

// const ImageSection = () => {
//   return (
//     <Box sx={{ textAlign: 'center', padding: 4 }}>
//       <Box
//         sx={{
//           display: 'inline-block',
//           // backgroundColor: "#FFE4E1",
//           backgroundColor: "#F5F5F5",
//           border: '2px solid #CCB6B4',  // Adds a square outline
//           padding: '8px', // Adds some padding inside the border
//           height: '600px', // Adjust this value as needed to increase background height
//           boxSizing: 'border-box', // Ensures padding is included in the height
//         }}
//       >
//         <Box
//           component="img"
//           src="/images/admin.png"
//           alt="Welcome"
//           sx={{
//             maxWidth: '100%',
//             height: 'auto',
//             display: 'block', // Ensures the image does not exceed the container's width
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ImageSection;



// src/components/WelcomeSection.js
import React from 'react';
import { Box, Paper } from '@mui/material';

const ImageSection = () => {
  return (
    <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ display: 'inline-block' }}>
        <Box
          component="img"
          src="/images/admin.jpg"
          alt="Welcome"
          sx={{ maxWidth: '100%', height: '430px', display: 'block' }}
        />
      </Paper>
    </Box>
  );
};

export default ImageSection;

 