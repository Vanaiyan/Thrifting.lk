// Calendar.js

import React from 'react';
import { Box, Typography, Grid,TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';

const Calendar = ({ selectedDate, handleDateChange }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Event Calendar
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        {/* Additional components or data related to selectedDate can be displayed here */}
      </Grid>
    </Box>
  );
};

export default Calendar;
