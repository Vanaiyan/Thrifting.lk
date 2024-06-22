// import axios from 'axios';
// import React, { useState } from 'react';
// import { Box, InputBase, IconButton, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchSellers = ({ onSearchResults }) => {
//   const [query, setQuery] = useState('');
//   const [sellerId, setSellerId] = useState('');

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get('http://localhost:8000/api/admin/seller/search', {
//         params: { query, sellerId }
//       });
//       onSearchResults(response.data.sellers);
//     } catch (error) {
//       console.error('Error searching:', error);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//       <Paper
//         component="form"
//         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '20px'}}
//         onSubmit={handleSearch}
//       >
//         <IconButton sx={{ p: '10px', color: '#ff5003'}} aria-label="search" type="submit">
//           <SearchIcon  />
//         </IconButton>
//         <InputBase
//           sx={{ ml: 1, flex: 1 }}
//           placeholder="Search"
//           inputProps={{ 'aria-label': 'search' }}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <InputBase
//           sx={{ ml: 1, flex: 1 }}
//           placeholder="Search by seller ID"
//           inputProps={{ 'aria-label': 'search by seller ID' }}
//           value={sellerId}
//           onChange={(e) => setSellerId(e.target.value)}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default SearchSellers;




// import axios from 'axios';
// import React, { useState } from 'react';
// import { Box, InputBase, IconButton, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useNavigate } from 'react-router-dom';

// const SearchSellers = ({ onSearchResults }) => {
//   const [query, setQuery] = useState('');
//   const [sellerId, setSellerId] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const params = { query, sellerId };
//       const response = await axios.get('http://localhost:8000/api/admin/seller/search', { params });
//       onSearchResults(response.data.sellers);

//       // Update the URL with search parameters
//       const searchParams = new URLSearchParams(params).toString();
//       navigate(`/admin/Sellers?${searchParams}`);
//     } catch (error) {
//       console.error('Error searching:', error);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//       <Paper
//         component="form"
//         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '20px' }}
//         onSubmit={handleSearch}
//       >
//         <IconButton sx={{ p: '10px', color: '#ff5003' }} aria-label="search" type="submit">
//           <SearchIcon />
//         </IconButton>
//         <InputBase
//           sx={{ ml: 1, flex: 1 }}
//           placeholder="Search"
//           inputProps={{ 'aria-label': 'search' }}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <InputBase
//           sx={{ ml: 1, flex: 1 }}
//           placeholder="Search by seller ID"
//           inputProps={{ 'aria-label': 'search by seller ID' }}
//           value={sellerId}
//           onChange={(e) => setSellerId(e.target.value)}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default SearchSellers;
