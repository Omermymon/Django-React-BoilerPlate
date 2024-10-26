import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const InvoiceItem = ({ invoice, onPayment }) => {
  const [paymentAmount, setPaymentAmount] = useState("");

  const handlePayment = () => {
    if (onPayment) {
      onPayment(invoice.id, paymentAmount);
    } else {
      console.error("onPayment function is not defined.");
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="h6">Reference: {invoice.reference}</Typography>
        <Typography variant="body1">Amount: {invoice.amount}</Typography>
        <Typography variant="body1">
          Paid Amount: {invoice.paid_amount}
        </Typography>
        <Typography variant="body1">Status: {invoice.status}</Typography>
        <Typography variant="body1">
          Created At: {new Date(invoice.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          Due Date: {new Date(invoice.due_date).toLocaleDateString()}
        </Typography>
        <TextField
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          placeholder="Enter payment amount"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mt: 1 }}
        />
        <Button
          onClick={handlePayment}
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
        >
          Submit Payment
        </Button>
      </Box>
    </Paper>
  );
};

export default InvoiceItem;
