import { useState, useEffect } from "react";
import InvoiceList from "./components/InvoiceList";
import AddInvoiceForm from "./components/AddInvoiceForm";
import ErrorDialog from "./components/ErrorAlert";
import InvoiceSelector from "./components/InvoiceSelector";
import {
  fetchInvoices,
  payInvoice,
  addInvoice,
} from "./services/invoiceService";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import GuideSection from "./components/GuideSection";

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
    const interval = setInterval(loadInvoices, 5000);
    return () => clearInterval(interval);
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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      width="100vw"
      sx={{ padding: 2, boxSizing: "border-box" }}
    >
      <div style={{ width: "70vw" }}>
        <Container maxWidth="md">
          <AppBar position="sticky" color="primary">
            <Toolbar>
              <Container maxWidth="md">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  <Typography variant="h4" align="center">
                    Invoice Manager
                  </Typography>
                  <PaymentsIcon fontSize="large" sx={{ marginLeft: "8px" }} />
                </Box>
              </Container>
            </Toolbar>
          </AppBar>

          <ErrorDialog
            open={Boolean(error)}
            message={error}
            onClose={handleCloseError}
          />

          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <div style={{ flex: 1, marginRight: "16px" }}>
                <AddInvoiceForm onAddInvoice={handleAddInvoice} />
              </div>
              <div style={{ flex: 1 }}>
                <InvoiceSelector
                  invoices={invoices}
                  selectedInvoice={selectedInvoice}
                  onSelect={setSelectedInvoice}
                  onPayment={handlePayment}
                />
              </div>
            </Box>
          </Paper>
          <InvoiceList invoices={invoices} onPayment={handlePayment} />
        </Container>
      </div>
      <GuideSection />
    </Box>
  );
}

export default App;
