import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AppBarAdmin from '../../Components/Admin/AppBarAdmin';
import DrawerAdmin from '../../Components/Admin/DrawerAdmin';
import Breadcrumb from '../../Components/Admin/Breadcrumbs';
import { issueSelller } from '../../Actions/adminActions';

const FeedbackReport = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const tableContainerHeight = 400; // Fixed height for the table container

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const issueSellerData = await issueSelller();
        setFeedbackData(issueSellerData);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerAdmin />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarAdmin />
        <Box sx={{ p: '15px' }}>
          <Breadcrumb />
        </Box>
        <Box sx={{ p: '20px' }}>
          <TableContainer component={Paper} sx={{ maxHeight: tableContainerHeight }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Seller Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Seller ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Seller Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Issue Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbackData.map((feedback) => (
                  <TableRow key={feedback.sellerId + feedback.issueCategory}>
                    <TableCell>{feedback.sellerName}</TableCell>
                    <TableCell>{feedback.sellerId}</TableCell>
                    <TableCell>{feedback.sellerEmail}</TableCell>
                    <TableCell>{feedback.issueCategory}</TableCell>
                    <TableCell>
                      {feedback.rating != null && typeof feedback.rating === 'number'
                        ? feedback.rating.toFixed(1)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackReport;
