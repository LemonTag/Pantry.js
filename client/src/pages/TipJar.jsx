import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const TipJar = () => {
  const [amount, setAmount] = useState(5); // Default amount $5

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Load Stripe.js with your publishable key
    const stripe = await loadStripe('YOUR_PUBLISHABLE_KEY');

    // Create a Checkout Session on your server
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const session = await response.json();

    // Redirect to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Like our product? Loving the recipes? Buy us a coffee!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Donation Amount (USD):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            step="1"
          />
        </label>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default TipJar;
