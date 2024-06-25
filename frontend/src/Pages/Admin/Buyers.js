// import React, { useState, useEffect } from 'react';
// import { Box, Grid } from "@mui/material";
// import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
// import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
// import UserCard from '../../Components/Admin/BuyerCard'; // Assuming UserCard component is similar to SellerCard but without delete option
// import Breadcrumb from '../../Components/Admin/Breadcrumbs';
// import { getUsers } from '../../Actions/adminActions'; // Assuming getApprovedUsers is similar to getApprovedSellers

// const AllUsersPage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersData = await getUsers();
//         setUsers(usersData);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <DrawerAdmin />
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBarAdmin />
//         <Box sx={{ p: "15px", display: 'flex'}}>
//           <Breadcrumb />
//         </Box>
//         <Grid container spacing={2} sx={{ p: "15px" }}>
//           {users.map(user => (
//             <Grid item key={user._id} xs={12} sm={6} md={4}>
//               <UserCard user={user} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

// export default AllUsersPage;



import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import BuyerCard from '../../Components/Admin/BuyerCard';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import { getUsers } from '../../Actions/adminActions'; // Assuming getUsers fetches all users from backend

const AllUserPage = () => {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const buyersData = await getUsers(); // Replace with actual API call to fetch buyers
        setBuyers(buyersData || []); // Ensure buyersData is an array or default to an empty array
      } catch (error) {
        console.error('Error fetching buyers:', error);
        setBuyers([]); // Set buyers to empty array on error
      }
    };

    fetchBuyers();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Box sx={{ p: "15px" }}>
          <Breadcrumb />
          <Container sx={{ p: "15px" }}>
            <Grid container spacing={3}>
              {buyers.map((buyer, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <BuyerCard buyer={buyer} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AllUserPage;

