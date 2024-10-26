import { useState, useEffect } from "react";
import InvoiceList from "./components/InvoiceList";
import AddInvoiceForm from "./components/AddInvoiceForm";
import ErrorDialog from "./components/ErrorAlert";
import InvoiceSelector from "./components/InvoiceSelector"; // Import the new component
import {
  fetchInvoices,
  payInvoice,
  addInvoice,
} from "./services/invoiceService";
import { Container, Typography, Paper, Box } from "@mui/material";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        setError("Error fetching invoices.");
      }
    };
    loadInvoices();
  }, []);

  const handlePayment = async (invoiceId, paymentAmount) => {
    setError(null);
    const invoice = invoices.find((inv) => inv.id === invoiceId);

    if (!invoice) {
      setError("Invoice not found.");
      return;
    }

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setError("Payment amount must be a positive number.");
      return;
    }

    if (paymentAmount > invoice.amount - invoice.paid_amount) {
      setError("Payment amount exceeds remaining balance.");
      return;
    }

    try {
      const updatedInvoice = await payInvoice(invoiceId, paymentAmount);
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        )
      );
    } catch (error) {
      setError("Failed to process payment.");
    }
  };

  const handleAddInvoice = async (newInvoice) => {
    setError(null);

    if (isNaN(newInvoice.amount) || newInvoice.amount <= 0) {
      setError("Invoice amount must be a positive number.");
      return;
    }

    try {
      const invoice = await addInvoice(newInvoice);
      setInvoices((prevInvoices) => [...prevInvoices, invoice]);
    } catch (error) {
      setError("Failed to add invoice.");
    }
  };

  const handleCloseError = () => setError(null);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Invoice Manager
      </Typography>

      <ErrorDialog
        open={Boolean(error)}
        message={error}
        onClose={handleCloseError}
      />

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <div style={{ flex: 1, marginRight: "16px" }}>
            <AddInvoiceForm onAddInvoice={handleAddInvoice} />
          </div>
          <div style={{ flex: 1 }}>
            <InvoiceSelector
              invoices={invoices}
              selectedInvoice={selectedInvoice}
              onSelect={setSelectedInvoice}
              onPayment={handlePayment} // Pass the payment handler
            />
          </div>
        </Box>
      </Paper>
      <InvoiceList invoices={invoices} onPayment={handlePayment} />
    </Container>
  );
}

export default App;
