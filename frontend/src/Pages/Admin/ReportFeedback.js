import React from 'react';
import { Box, GlobalStyles, Grid } from '@mui/material';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import DeleteReportFeedback from '../../Components/Admin/DeleteReportFeedback';
import WarnReportFeedback from '../../Components/Admin/WarnReportFeedback';

const FeedbackReport = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          'html, body': {
            backgroundColor: '#EFEFEF',
            margin: 0,
            padding: 0,
            height: '100%',
          },
        }}
      />

      <Box sx={{ display: 'flex', backgroundColor: '#EFEFEF', minHeight: '100vh' }}>
        <DrawerAdmin />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarAdmin />
          <Box sx={{ p: '15px' }}>
            <Breadcrumb />
          </Box>
          <Grid container spacing={3} sx={{ p: '20px' }}>
            <Grid item xs={12} >
              <DeleteReportFeedback />
            </Grid>
            <Grid item xs={12} >
              <WarnReportFeedback />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default FeedbackReport;
