import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    amount: "",
    currency: "USD",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage("Error processing payment.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Simple Payment Interface</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="Enter card number"
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Currency:</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <button type="submit">Submit Payment</button>
      </form>

      {responseMessage && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>{responseMessage}</strong>
        </div>
      )}
    </div>
  );
}
