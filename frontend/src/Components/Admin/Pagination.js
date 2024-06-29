import React from 'react';
import { Box, Pagination } from "@mui/material";

const PagePagination = ({ totalPages, currentPage, handlePageChange }) => {
  if (totalPages <= 1) {
    return null; // Do not render pagination if there is only one page
  }

  return (
    <Box display="flex" justifyContent="center" my={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        variant="filled"
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: '1.25rem', // Increase font size
            minWidth: '48px', // Increase button width
            height: '48px', // Increase button height
            color: '#ff5003', // Text color for pagination buttons
            '&:hover': {
              backgroundColor: '#ff5003', // Background color on hover
              color: '#FFFFFF', // Text color on hover
            },
            '&.Mui-selected': {
              backgroundColor: '#ff5003', // Background color for selected page
              color: '#FFFFFF', // Text color for selected page
            },
          },
        }}
      />
    </Box>
  );
};

export default PagePagination;
