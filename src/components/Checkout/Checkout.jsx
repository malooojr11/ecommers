import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CartContext } from '../../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  // Access cartId and clearCart from CartContext
  const { cartId, clearCart } = useContext(CartContext);

  const navigate = useNavigate();


  // State to manage selected payment method (default: card)
  const [paymentMethod, setPaymentMethod] = useState('card'); 

  // Formik handles form state and submission
  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },

    onSubmit: async (values) => {
      // Prevent proceeding if there's no cart
      if (!cartId) {
        toast.error('Cart is empty or not loaded');
        return;
      }

      try {
        if (paymentMethod === 'cash') {
          // Place a cash order
          const { data } = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            { shippingAddress: values },
            {
              headers: {
                token: localStorage.getItem('userToken')
              }
            }
          );

          if (data.status === 'success') {
            toast.success('Cash order placed successfully');
            clearCart();
            navigate('/');
          } else {
            toast.error('Failed to place cash order');
          }

        } else {
          // Initiate a card payment session
          const { data } = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
            { shippingAddress: values },
            {
              headers: {
                token: localStorage.getItem('userToken')
              }
            }
          );

          if (data.status === 'success') {
            toast.success('Redirecting to payment...');
            clearCart();
            window.location.href = data.session.url;
          } else {
            toast.error('Something went wrong during checkout');
          }
        }
      } catch (err) {
        // Handle unexpected errors
        toast.error(err.response?.data?.message || 'Checkout failed');
      }
    }
  });

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Shipping Address Input */}
        <input
          name="details"
          placeholder="Shipping Address"
          className="w-full border p-2 rounded"
          value={formik.values.details}
          onChange={formik.handleChange}
        />

        {/* Phone Number Input */}
        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />

        {/* City Input */}
        <input
          name="city"
          placeholder="City"
          className="w-full border p-2 rounded"
          value={formik.values.city}
          onChange={formik.handleChange}
        />

        {/* Payment Method Selector */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Card
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            Cash
          </label>
        </div>

        {/* Submit Button (Dynamic text based on method) */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
        >
          {paymentMethod === 'cash' ? 'Place Cash Order' : 'Checkout with Card'}
        </button>
      </form>
    </div>
  );
}
