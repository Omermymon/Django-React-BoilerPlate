import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import InvoiceItem from "./InvoiceItem"; // Import the InvoiceItem component

const InvoiceSelector = ({
  invoices,
  selectedInvoice,
  onSelect,
  onPayment,
}) => {
  const invoice = invoices.find((inv) => inv.id === selectedInvoice);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Choose Invoice by Reference
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="invoice-selector-label">Select Invoice</InputLabel>
        <Select
          labelId="invoice-selector-label"
          value={selectedInvoice || ""}
          onChange={(e) => onSelect(e.target.value)}
          displayEmpty
        >
          {invoices.map((invoice) => (
            <MenuItem key={invoice.id} value={invoice.id}>
              {invoice.reference} - Amount: {invoice.amount}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display selected invoice details using InvoiceItem */}
      {selectedInvoice && invoice && (
        <Box sx={{ mt: 2 }}>
          <InvoiceItem invoice={invoice} onPayment={onPayment} />
        </Box>
      )}
    </Box>
  );
};

export default InvoiceSelector;
