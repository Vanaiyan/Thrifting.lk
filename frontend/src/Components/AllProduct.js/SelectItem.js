import React, { useState } from "react";
import { Box, TextField, MenuItem,Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      border: "none",
      borderRadius: "20px",
    },
    "&:hover fieldset": {
      border: "none",
    },
  },
});

const SelectItem = ({ onCategoryChange }) => {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };


   

  const handleClearFilter = () => {
    // Clear all filters logic here
    setCategory('');
   
  };

  return (
    <Box  sx={{ display: 'flex' }}>
    <Box
      sx={{
        width: { lg: "260px", md: "240px", sm: "220px", xs: "210px" },
        display: "flex",
        borderRadius: "20px",
        padding: "0px",
        margin: {
          lg: "5vw 1vw 3vw 10vw",
          md: "3vw 1vw 3vw 8vw",
          sm: "11vw 1vw 3vw 11vw",
          xs: "14vw 1vw 3vw 3vw",
        },
        position: "relative",
        bgcolor: "#ebeced",
        transition: "background-color 0.4s ease-in",
        "&:hover": {
          bgcolor: "#c7c8c9",
        },
      }}
    >
      <StyledTextField
        label="Select Category"
        select
        size="small"
        value={category}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="Men">Men's Clothing</MenuItem>
        <MenuItem value="Women">Women's Clothing</MenuItem>
        <MenuItem value="Phone">Phone</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Headphone">Headphone</MenuItem>
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Acces">Accessories</MenuItem>
        <MenuItem value="LB">Luggage & Bags</MenuItem>
        <MenuItem value="SE">Sports & Entertainment</MenuItem>
        <MenuItem value="HG">Home & Garden</MenuItem>
      </StyledTextField>
    </Box>

    <Box 
        sx={{
          width: { lg: "160px", md: "140px", sm: "120px", xs: "120px" },
          display: 'flex',
          borderRadius: "20px",
          padding: "0px",
          margin: { lg: "5vw 0 3vw 0vw", md: "3vw 0 3vw 0vw", sm: "11vw 0 3vw 0vw", xs:"14vw 0 3vw 0vw" },
          position: "relative",
          bgcolor: "none",
          transition: "background-color 0.4s ease-in",
          "&:hover": {
            bgcolor: "#c7c8c9",
          },
        }}
      >
        <Typography 
          variant="subtitle2"
          sx={{
            margin: "10px 20px 10px 10px",
            position: "relative",
          }}
          onClick={handleClearFilter}
        >
          Clear All Filter
        </Typography>
      </Box>
      </Box>
  );
};

export default SelectItem;



















// import * as React from 'react';
// import { Box, TextField, MenuItem, Typography, Button } from "@mui/material"
// import { useState } from "react"
// import { styled } from "@mui/system"
// import InputAdornment from '@mui/material/InputAdornment';
// import Popper from '@mui/material/Popper';
// import Paper from '@mui/material/Paper';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import IconButton from '@mui/material/IconButton';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// const StyledTextField = styled(TextField)({
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '20px', 
//     '& fieldset': {
//       border: 'none',
//       borderRadius: '20px',
//     },
//     '&:hover fieldset': {
//       border: 'none',
//     },
//   },
// });

// export const SelectItem = () => {
//   const [category, setCategory] = useState('');
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [minPrice, setMinPrice] = React.useState('');
//   const [maxPrice, setMaxPrice] = React.useState('');

//   const handleChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMinPriceChange = (event) => {
//     setMinPrice(event.target.value);
//   };

//   const handleMaxPriceChange = (event) => {
//     setMaxPrice(event.target.value);
//   };

//   const handleApplyFilter = () => {
//     // Apply filter logic here
//     console.log(`Filter products between ${minPrice} and ${maxPrice}`);
//   };

//   const handleClearFilter = () => {
//     // Clear all filters logic here
//     setCategory('');
//     setMinPrice('');
//     setMaxPrice('');
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'price-popper' : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box sx={{
//         width: { lg: "260px", md: "240px", sm: "220px", xs: "210px" },
//         display: 'flex',
//         borderRadius: "20px",
//         padding: "0px",
//         margin: { lg: "5vw 1vw 3vw 10vw", md: "3vw 1vw 3vw 8vw", sm: "11vw 1vw 3vw 11vw", xs:"14vw 1vw 3vw 3vw" },
//         position: "relative",
//         bgcolor: "#ebeced",
//         transition: "background-color 0.4s ease-in",
//         "&:hover": {
//           bgcolor: "#c7c8c9",
//         },
//       }}>
//         <StyledTextField 
//           label='Select Category' 
//           select
//           size="small" 
//           value={category} 
//           onChange={handleChange} 
//           fullWidth 
//         >
//           <MenuItem value='Men'>Men's Clothing</MenuItem>
//           <MenuItem value='Women'>Women's Clothing</MenuItem>
//           <MenuItem value='BH'>Beauty & Health</MenuItem>
//           <MenuItem value='BK'>Babies & Kids</MenuItem>
//           <MenuItem value='Electronic'>Electronics</MenuItem>
//           <MenuItem value='Furniture'>Furniture</MenuItem>
//           <MenuItem value='JW'>Jewelry & Watches</MenuItem>
//           <MenuItem value='Acces'>Accessories</MenuItem>
//           <MenuItem value='LB'>Luggage & Bags</MenuItem>
//           <MenuItem value='SE'>Sports & Entertainment</MenuItem>
//           <MenuItem value='HG'>Home & Garden</MenuItem>
//         </StyledTextField>
//       </Box>

//       <Box sx={{
//         width: { lg: "180px", md: "160px", sm: "140px", xs: "140px" },
//         display: 'flex',
//         borderRadius: "20px",
//         padding: "0px",
//         margin: { lg: "5vw 1vw 3vw 3vw", md: "3vw 1vw 3vw 3vw", sm: "11vw 1vw 3vw 3vw", xs: "14vw 1vw 3vw 0" },
//         position: "relative",
//         bgcolor: "#ebeced",
//         transition: "background-color 0.4s ease-in",
//         "&:hover": {
//           bgcolor: "#c7c8c9",
//         },
//       }}>
//         <StyledTextField
//           label="Price"
//           size="small"
//           variant="outlined"
//           onClick={handleClick}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleClick} style={{ cursor: 'pointer' }}>
//                   <ArrowDropDownIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Popper id={id} open={open} anchorEl={anchorEl}>
//           <Paper>
//             <ClickAwayListener onClickAway={handleClose}>
//               <div>
//                 <TextField
//                   size='small'
//                   label="Min Price"
//                   variant="outlined"
//                   value={minPrice}
//                   onChange={handleMinPriceChange}
//                   sx={{ width: '100px', marginRight: '8px' }}
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">$</InputAdornment>,
//                   }}
//                 />
//                 <TextField
//                   size='small'
//                   label="Max Price"
//                   variant="outlined"
//                   value={maxPrice}
//                   onChange={handleMaxPriceChange}
//                   sx={{ width: '100px', marginRight: '8px' }}
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">$</InputAdornment>,
//                   }}
//                 />
//                 <Button variant="contained" color="primary" onClick={handleApplyFilter}>Apply Filter</Button>
//               </div>
//             </ClickAwayListener>
//           </Paper>
//         </Popper>
//       </Box>

//       <Box 
//         sx={{
//           width: { lg: "160px", md: "140px", sm: "120px", xs: "120px" },
//           display: 'flex',
//           borderRadius: "20px",
//           padding: "0px",
//           margin: { lg: "5vw 0 3vw 0vw", md: "3vw 0 3vw 0vw", sm: "11vw 0 3vw 0vw", xs:"14vw 0 3vw 0vw" },
//           position: "relative",
//           bgcolor: "none",
//           transition: "background-color 0.4s ease-in",
//           "&:hover": {
//             bgcolor: "#c7c8c9",
//           },
//         }}
//       >
//         <Typography 
//           variant="subtitle2"
//           sx={{
//             margin: "10px 20px 10px 10px",
//             position: "relative",
//           }}
//           onClick={handleClearFilter}
//         >
//           Clear All Filter
//         </Typography>
//       </Box>
//     </Box>
//   );
// };
