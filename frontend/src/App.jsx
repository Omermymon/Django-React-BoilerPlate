import { useState, useEffect } from "react";
import "./App.css";
import InvoiceList from "./components/InvoiceList";

function App() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/invoices/");
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    fetchInvoices();
  }, []);

  const handlePayment = async (invoiceId, paymentAmount) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/invoices/${invoiceId}/pay/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payment_amount: paymentAmount }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment failed: " + response.statusText);
      }

      const updatedInvoice = await response.json();
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        )
      );
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="App">
      <h1>Invoices</h1>
      <InvoiceList invoices={invoices} onPayment={handlePayment} />
    </div>
  );
}

export default App;
