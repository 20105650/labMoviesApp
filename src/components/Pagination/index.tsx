import React from "react";
import Box from "@mui/material/Box"; // Import Box component for styling
import Button from "@mui/material/Button"; // Import Button component from Material-UI

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const styles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
   
  },
  paginationButton: {
    padding: "10px 20px",
    margin: "0 5px",
    border: "none",
    backgroundColor: "#1976d2", // Change background color to blue
    color: "white", // Change text color to purple
    cursor: "pointer",
    borderRadius: "5px",
    outline: "none",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
    "&:disabled": {
      backgroundColor: "#1976d2",
      color: "#6c757d",
      cursor: "not-allowed",
    },
  },
  paginationText: {
    margin: "0 10px",
    fontSize: "16px",
    fontWeight: "bold",
    // Change background color to blue
    color: "#1976d2", // Change text color to white
    padding: "5px", // Add padding to enhance readability
    borderRadius: "5px", // Add border-radius for rounded corners
  },
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Box sx={styles.paginationContainer}>
      <Button
        style={styles.paginationButton}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span style={styles.paginationText}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        style={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;



