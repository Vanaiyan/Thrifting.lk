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
  Typography,
  TableFooter,
  TablePagination,
} from '@mui/material';
import { toDeleteSeller } from '../../Actions/adminActions';

const DeleteReportFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tableContainerHeight = 400;

  const fetchFeedbackData = async (page, limit) => {
    try {
      const issueSellerData = await toDeleteSeller(page, limit);
      setFeedbackData(issueSellerData.results);
      setTotalRows(issueSellerData.totalCount);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  useEffect(() => {
    fetchFeedbackData(page + 1, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: '20px' }}>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginLeft: '20px' }}>To Be Delete</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: tableContainerHeight }}>
        <Table stickyHeader sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Seller Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Seller ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Seller Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Issue Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackData.map((feedback, index) => (
              <TableRow key={feedback.sellerId + feedback.issueCategory}>
                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
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
          <TableFooter sx={{ position: 'sticky', bottom: 0, backgroundColor: '#FFF5F0' }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeleteReportFeedback;
