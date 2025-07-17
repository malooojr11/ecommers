import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export default function ForgotPassword() {
  const navigate = useNavigate();

  // Formik handles the email input and submission
  const formik = useFormik({
    initialValues: {
      email: '',
    },

    // When form is submitted
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send POST request to initiate password reset
        const { data } = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
          {
            email: values.email.trim(), // clean email input
          }
        );

        console.log(data);

        // If backend returns success message
        if (data.statusMsg === 'success') {
          toast.success('Reset request successful!');
          localStorage.setItem('resetEmail', values.email.trim());
          navigate('/resetPassword'); // Navigate to next step
        } else {
          toast.error(data.message || 'Something went wrong.');
        }

      } catch (err) {
        // Handle error responses gracefully
        toast.error(err.response?.data?.message || 'Server error. Try again later.');
      } finally {
        setSubmitting(false); // Re-enable submit button
      }
    }
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {/* Page Title */}
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Your Password?</h2>

        {/* Email Input Field */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600"
        >
          {formik.isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
}
