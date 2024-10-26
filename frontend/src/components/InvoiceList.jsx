import React from "react";
import InvoiceItem from "./InvoiceItem";
import { Box, Typography, List, ListItem, Paper } from "@mui/material";

const InvoiceList = ({ invoices, onPayment }) => {
  return (
    <Box mt={2} p={2} component={Paper} elevation={3}>
      {invoices.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No invoices available.
        </Typography>
      ) : (
        <List>
          {invoices.map((invoice) => (
            <ListItem key={invoice.reference} divider>
              <InvoiceItem
                invoice={invoice}
                onPayment={onPayment} // Pass onPayment down to InvoiceItem
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default InvoiceList;
