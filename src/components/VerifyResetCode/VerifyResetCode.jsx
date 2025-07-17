import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
          resetCode: values.resetCode,
        });

        if (data.status === 'Success') {
          toast.success('Code verified successfully');
          localStorage.setItem('resetCode', values.resetCode);
          navigate('/resetPassword');
        } else {
          toast.error('Invalid code');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Verification failed');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Enter Reset Code</h2>

        <input
          type="text"
          name="resetCode"
          required
          placeholder="Enter 6-digit code"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
        >
          {formik.isSubmitting ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>
    </div>
  );
}
