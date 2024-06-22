import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import DashboardCard from '../../Components/Admin/DashboardCard';
import SaleGraph from '../../Components/Admin/SaleGraph';
import BestSellers from '../../Components/Admin/BestSeller';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ImageSection from '../../Components/Admin/ImageSection';
import {getCounts} from "../../Actions/adminActions";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    totalProducts: 0,
    totalSellers: 0,
    totalBuyers: 0,
    totalOrders: 0
  });


  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const countsData = await getCounts();
        setCounts(countsData);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);


  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Box sx={{ p: "15px" }}>
          <Breadcrumb />
        </Box>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Grid container spacing={3}>
            {/* Dashboard Cards */}
            <DashboardCard
              title="Total Products"
              value={counts.totalProducts}
              icon={<ShoppingCartIcon fontSize="inherit" />}
              timestamp={formatDate(new Date())} 
              showDetailsPath="/admin/AllProducts" // Specify the path for "Show Details"
            />
            <DashboardCard
              title="Total Sellers"
              value={counts.totalSellers}
              icon={<GroupIcon fontSize="inherit" />}
              timestamp={formatDate(new Date())} 
              showDetailsPath="/admin/Sellers" // Specify the path for "Show Details"
            />
            <DashboardCard
              title="Total Buyers"
              value={counts.totalBuyers}
              icon={<PeopleIcon fontSize="inherit" />}
              timestamp={formatDate(new Date())} 
              showDetailsPath="/admin/Buyers" // Specify the path for "Show Details"
            />
            <DashboardCard
              title="Total Orders"
              value={counts.totalOrders}
              icon={<AssignmentTurnedInIcon fontSize="inherit" />}
              timestamp={formatDate(new Date())} 
              showDetailsPath="/admin/OrderList" // Specify the path for "Show Details"
            />
            {/* Sale Graph */}
            <Grid item xs={12} md={12}>
              <SaleGraph />
            </Grid>
           {/* Best Sellers and Image Section */}
           <Grid container item xs={12}  alignItems="center">
              <Grid item xs={8} md={6}>
                <BestSellers />
              </Grid>
              <Grid item xs={4} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <ImageSection />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
