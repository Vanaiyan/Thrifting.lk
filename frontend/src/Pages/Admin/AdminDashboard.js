import React, { useEffect, useState } from 'react';
import { Grid, Box, GlobalStyles } from '@mui/material';
import DashboardCard from '../../Components/Admin/DashboardCard';
import BestSellers from '../../Components/Admin/BestSeller';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { getCounts } from "../../Actions/adminActions";
import ProductGraph from '../../Components/Admin/ProductGraph';
import OrderGraph from '../../Components/Admin/OrderGraph';
import ImageSection from '../../Components/Admin/ImageSection';

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
    <>
      <GlobalStyles styles={{
        'html, body': {
          backgroundColor: '#EFEFEF',
          margin: 0,
          padding: 0,
          height: '100%',
        }
      }} />

    <Box sx={{ display: "flex", backgroundColor: "#EFEFEF", minHeight: "100vh" }}> {/* Set background color and minimum height */}
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
              showDetailsPath="/admin/AllProducts"
              backgroundColor="#e3f2fd" // Light blue
              iconBackgroundColor="#1976d2" // Dark blue for icon background
            />
            <DashboardCard
              title="Total Sellers"
              value={counts.totalSellers}
              icon={<GroupIcon fontSize="inherit" />}
              timestamp={formatDate(new Date())}
              showDetailsPath="/admin/Sellers"
              backgroundColor="#fff3e0" // Light orange
              iconBackgroundColor="#ff9800" // Dark orange for icon background
            />
            <DashboardCard
              title="Total Buyers"
              value={counts.totalBuyers}
              icon={<PeopleIcon fontSize="inherit" />}
              timestamp={formatDate(new Date())}
              showDetailsPath="/admin/Buyers"
              backgroundColor="#e8f5e9" // Light green
              iconBackgroundColor="#4caf50" // Dark green for icon background
            />
            <DashboardCard
              title="Total Orders"
              value={counts.totalOrders}
              icon={<AssignmentTurnedInIcon fontSize="inherit" />}
              timestamp={formatDate(new Date())}
              showDetailsPath="/admin/OrderList"
              backgroundColor="#f3e5f5" // Light purple
              iconBackgroundColor="#9c27b0" // Dark purple for icon background
            />
            {/* Sale Graph */}
            <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={8}>
              <OrderGraph />
            </Grid>
            <Grid item xs={12} md={4}>
              <ImageSection/>
            </Grid>
            </Grid>
            {/* Best Sellers and Product Graph */}
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} md={5}>
                <BestSellers />
              </Grid>
              <Grid item xs={12} md={7}>
                <ProductGraph />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default AdminDashboard;
