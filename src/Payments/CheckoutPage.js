import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const plans = [
  { id: 1, name: 'Basic', price: 299, features: ['Full HD streaming', '1 device at a time', '15 Days of Validity'] },
  { id: 2, name: 'Standard', price: 599, features: ['Full HD streaming', '2 devices at a time', '30 Days of Validity'] },
  { id: 3, name: 'Premium', price: 999, features: ['Full HD streaming', '3 devices at a time', '60 Days of Validity'] },
];

const CheckoutPage = () => {
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isRegistered, setIsRegistered] = useState(true); // Simulate registration check
  const [errorMessage, setErrorMessage] = useState('');
  const { id: planId } = useParams(); // Get the plan ID from the route parameters
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch plan details based on the planId
    const fetchedPlan = plans.find((p) => p.id === parseInt(planId));

    if (fetchedPlan) {
      setPlan(fetchedPlan);
    } else {
      // Redirect to home page if plan is not found
      navigate('/');
    }
  }, [planId, navigate]); // Include navigate as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    if (!isRegistered) {
      setErrorMessage('Please register first before checking out.');
      return;
    }

    const paymentData = {
      Name: formData.name,
      Email: formData.email,
      PhoneNumber: formData.phone,
      Amount: plan.price, // Use the plan price as the amount
    };

    try {
      const response = await fetch('https://api.indrajala.in/api/pay/phonepe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      console.log('Payment Response:', result);

      if (response.status === 404) {
        setErrorMessage("Kindly use the email ID used during registration or register with us.");
        return;
      }

      if (response.status === 201) {
        // Check if the response has the expected structure
        if (result.data && 
            result.data.data && 
            result.data.data.instrumentResponse && 
            result.data.data.instrumentResponse.redirectInfo && 
            result.data.data.instrumentResponse.redirectInfo.url) {
          
          // Get the redirect URL
          const redirectUrl = result.data.data.instrumentResponse.redirectInfo.url;
          
          // Open the URL in a new tab
          window.open(redirectUrl, '_blank');
        } else {
          setErrorMessage("Unexpected response format. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred during payment. Please try again.");
      }

    } catch (error) {
      console.error('Error during payment:', error);
      setErrorMessage("An error occurred during payment. Please try again.");
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
              <p className="price">₹{plan.price}</p>
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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="checkout-button">Checkout</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;