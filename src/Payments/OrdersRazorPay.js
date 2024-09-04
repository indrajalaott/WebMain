"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CheckoutPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const plans = [
  { id: 1, name: 'Basic', price: 3.75, features: ['Full HD streaming', '1 device at a time', '15 Days of Validity'] },
  { id: 2, name: 'Standard', price: 7.5, features: ['Full HD streaming', '2 devices at a time', '30 Days of Validity'] },
  { id: 3, name: 'Premium', price: 11.75, features: ['Full HD streaming', '3 devices at a time', '60 Days of Validity'] },
];

const CheckoutPage = () => {
  const { id: planIdFromUrl } = useParams();
  const [plan, setPlan] = useState(plans[0]);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    PhoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const id = planIdFromUrl ? parseInt(planIdFromUrl) : 1;
    const fetchedPlan = plans.find((p) => p.id === id) || plans[0];
    setPlan(fetchedPlan);

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [planIdFromUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setResponseMessage('');

    const paymentData = {
      ...formData,
      Option: plan.id.toString(),
    };

    try {
      const response = await fetch('https://api.indrajala.in/api/pay/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      console.log('Payment Response:', result);

      if (response.ok) {
        setResponseMessage(JSON.stringify(result, null, 2));
        initiateRazorpayPayment(result);
      } else {
        setErrorMessage(result.message || "An error occurred during payment. Please try again.");
      }

    } catch (error) {
      console.error('Error during payment:', error);
      setErrorMessage("An error occurred during payment. Please try again.");
    }
  };

  const initiateRazorpayPayment = (orderData) => {
    const options = {
      key: 'zp_live_K5IzvR8gLRxvCW', // Replace with your actual Razorpay key
      amount: orderData.amount * 100, // Razorpay expects amount in paise (1 USD = 100 paise)
      currency: orderData.currency || 'USD', // Ensure currency is set to USD
      name: 'Indrajala Movie Makers LLP',
      description: `Payment for ${plan.name} Plan`,
      order_id: orderData.orderId,
      handler: function (response) {
        verifyPayment(response, orderData);
      },
      prefill: {
        name: formData.Name,
        email: formData.Email,
        contact: formData.PhoneNumber
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (paymentResponse, orderData) => {
    console.log('Payment Response:', paymentResponse); // Log payment response
    try {
      const verificationData = {
        Order_ID: orderData.orderId,
        Payment_ID: paymentResponse.razorpay_payment_id,
        Signature: paymentResponse.razorpay_signature
      };

      const response = await fetch('https://api.indrajala.in/api/pay/verifyPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      const result = await response.json();
      console.log('Verification Response:', result);

      if (response.ok) {
        setResponseMessage('Payment verified successfully!');
        // Handle successful payment (e.g., redirect to success page, update user's subscription, etc.)
      } else {
        setErrorMessage('Payment verification failed. Please contact support.');
      }

    } catch (error) {
      console.error('Error during payment verification:', error);
      setErrorMessage('An error occurred during payment verification. Please contact support.');
    }
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-container">
        <div className="plan-details">
          {plan ? (
            <>
              <h1>{plan.name}</h1>
              <p className="price">${plan.price.toFixed(2)}</p>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading plan details...</p>
          )}
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Checkout Form</h2>
            <p className="registration-note">
              Please enter your registered email ID. If you are not registered, please register first.
            </p>
            <div className="form-group">
              <label htmlFor="Name">Name:</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="PhoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="checkout-button">Checkout</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && (
              <div className="response-message">
                <h3>API Response:</h3>
                <pre>{responseMessage}</pre>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;