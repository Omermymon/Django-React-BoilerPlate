import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function AddInvoiceForm({ onAddInvoice }) {
  const [newInvoice, setNewInvoice] = useState({
    reference: "",
    amount: "",
    due_date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddInvoice(newInvoice);
    setNewInvoice({ reference: "", amount: "", due_date: "" });
  };

  return (
    <Box sx={{ mb: 4 }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" mb={1}>
        Add New Invoice
      </Typography>
      <Box display="flex" flexDirection="column" spacing={2}>
        <Box mb={2}>
          <TextField
            label="Reference"
            fullWidth
            required
            value={newInvoice.reference}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, reference: e.target.value })
            }
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            required
            value={newInvoice.amount}
            onChange={(e) =>
              setNewInvoice({
                ...newInvoice,
                amount: parseFloat(e.target.value),
              })
            }
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={newInvoice.due_date}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, due_date: e.target.value })
            }
          />
        </Box>
      </Box>
      <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
        Add Invoice
      </Button>
    </Box>
  );
}

export default AddInvoiceForm;
