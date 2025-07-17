import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export default function ResetPassword() {
  const navigate = useNavigate();
  const code = localStorage.getItem('resetCode'); // 👈 خزن في verifyResetCode

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      if (!code) {
        toast.error('No reset code found. Please verify your code again.');
        return;
      }

      try {
        const { data } = await axios.put(
          'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
          {
            resetCode: code,
            newPassword: values.password,
          }
        );

        if (data.token) {
          toast.success('Password has been reset successfully!');
          localStorage.removeItem('resetCode');
          localStorage.removeItem('resetEmail');
          navigate('/login');
        } else {
          toast.error('Reset failed');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Something went wrong');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Your Password</h2>

        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full px-3 py-2 border rounded-md mb-4"
          required
        />

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
        >
          {formik.isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}
