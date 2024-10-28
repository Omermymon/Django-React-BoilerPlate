import React from "react";
import { Box, Typography } from "@mui/material";

const GuideSection = () => {
  return (
    <Box
      position="sticky"
      top="16px"
      textAlign="center"
      maxWidth="400px"
      mx="auto"
      p={2}
      padding={8}
    >
      <Typography variant="h6" gutterBottom>
        Invoice Management App UI Guide
      </Typography>
      <Typography variant="body2">
        <strong>1. Adding Payments:</strong> Select an invoice from the Invoice
        List or choose an invoice by reference from the dropdown menu, enter the
        payment amount in the Payment Section, and click Submit Payment.
      </Typography>
      <Typography variant="body2">
        <strong>2. Adding Invoices:</strong> Click the Add Invoice button in the
        dashboard after filling in the required details, this will add a new
        invoice to the list.
      </Typography>
    </Box>
  );
};

export default GuideSection;
