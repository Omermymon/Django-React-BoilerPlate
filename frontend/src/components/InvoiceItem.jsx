import React, { useState } from "react";

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
    <li>
      <h3>Reference: {invoice.reference}</h3>
      <p>Amount: {invoice.amount}</p>
      <p>Paid Amount: {invoice.paid_amount}</p>
      <p>Status: {invoice.status}</p>
      <p>Created At: {new Date(invoice.created_at).toLocaleDateString()}</p>
      <p>Due Date: {new Date(invoice.due_date).toLocaleDateString()}</p>
      <input
        type="number"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        placeholder="Enter payment amount"
      />
      <button onClick={handlePayment}>Submit Payment</button>
    </li>
  );
};

export default InvoiceItem;
