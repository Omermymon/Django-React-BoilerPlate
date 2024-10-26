import React from "react";
import InvoiceItem from "./InvoiceItem";

const InvoiceList = ({ invoices, onPayment }) => {
  // Add onPayment here
  return (
    <div>
      {invoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <ul>
          {invoices.map((invoice) => (
            <InvoiceItem
              key={invoice.reference}
              invoice={invoice}
              onPayment={onPayment} // Pass onPayment down to InvoiceItem
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvoiceList;
