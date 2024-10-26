import { useState, useEffect } from "react";
import "./App.css";
import InvoiceList from "./components/InvoiceList";
import {
  fetchInvoices,
  payInvoice,
  addInvoice,
} from "./services/invoiceService";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    reference: "",
    amount: "",
    paid_amount: 0,
    status: "NOT_PAID",
    due_date: "",
  });

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    loadInvoices();
  }, []);

  const handlePayment = async (invoiceId, paymentAmount) => {
    try {
      const updatedInvoice = await payInvoice(invoiceId, paymentAmount);
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        )
      );
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    try {
      const invoice = await addInvoice(newInvoice);
      setInvoices((prevInvoices) => [...prevInvoices, invoice]);
      setNewInvoice({
        reference: "",
        amount: "",
        paid_amount: 0,
        status: "NOT_PAID",
        due_date: "",
      });
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  };

  return (
    <div className="App">
      <h1>Invoices</h1>
      <InvoiceList invoices={invoices} onPayment={handlePayment} />
      <form onSubmit={handleAddInvoice}>
        <h2>Add New Invoice</h2>
        <input
          type="text"
          value={newInvoice.reference}
          onChange={(e) =>
            setNewInvoice({ ...newInvoice, reference: e.target.value })
          }
          placeholder="Reference"
          required
        />
        <input
          type="number"
          value={newInvoice.amount}
          onChange={(e) =>
            setNewInvoice({ ...newInvoice, amount: e.target.value })
          }
          placeholder="Amount"
          required
        />
        <input
          type="date"
          value={newInvoice.due_date}
          onChange={(e) =>
            setNewInvoice({ ...newInvoice, due_date: e.target.value })
          }
          required
        />
        <button type="submit">Add Invoice</button>
      </form>
    </div>
  );
}

export default App;
