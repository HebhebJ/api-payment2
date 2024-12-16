export default function handler(req, res) {
    const validCards = ["1234567812345678", "8765432187654321"]; // Hardcoded valid cards
  
    if (req.method === "POST") {
      const { cardNumber, amount, currency } = req.body;
  
      // Validate Request
      if (!cardNumber || !amount || !currency) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: cardNumber, amount, or currency.",
        });
      }
  
      // Check if the card is valid
      const isValidCard = validCards.includes(cardNumber);
  
      if (isValidCard) {
        return res.status(200).json({
          success: true,
          message: `Payment of ${amount} ${currency} processed successfully!`,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid card number. Payment failed.",
        });
      }
    } else {
      return res.status(405).json({
        success: false,
        message: "Only POST requests are allowed.",
      });
    }
  }
  