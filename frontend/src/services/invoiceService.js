const API_URL = "http://localhost:8000/api/invoices/";

export const fetchInvoices = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }
  return await response.json();
};

export const payInvoice = async (invoiceId, paymentAmount) => {
  const response = await fetch(`${API_URL}${invoiceId}/pay/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payment_amount: paymentAmount }),
  });

  if (!response.ok) {
    throw new Error("Payment failed: " + response.statusText);
  }

  return await response.json();
};

export const addInvoice = async (invoiceData) => {
  const response = await fetch(`${API_URL}create_invoice/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error("Failed to add invoice: " + response.statusText);
  }

  return await response.json();
};
