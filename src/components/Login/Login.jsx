import React, { useState, useContext } from 'react';
import './Login.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../Context/UserContext';

export default function Login() {
  const navigator = useNavigate(); // Used to redirect after login
  const [errorMsg, seterrorMsg] = useState(null); // Error message state
  const [isLoading, setisLoading] = useState(false); // Loading spinner control
  const { setUser } = useContext(UserContext); // Accessing global user context

  // Submit form handler
  function submitForm(values) {
    setisLoading(true); // Show loading spinner
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(({ data }) => {
        if (data.message === 'success') {
          // Save token to localStorage and set user context
          localStorage.setItem('userToken', data?.token);
          setUser(data?.token);
          navigator('/'); // Redirect to homepage
        }
      })
      .catch((error) => {
        // Show error from server
        seterrorMsg(error?.response?.data?.message);
      })
      .finally(() => {
        setisLoading(false); // Hide spinner
      });
  }

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: submitForm
  });

  return (
    <>
      {/* Centered container */}
      <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">

          {/* Heading */}
          <div className="bg-white p-6">
            <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt='Face' />
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome to the Login Page
            </h2>
          </div>

          {/* Form section */}
          <div className="bg-white shadow-md rounded-md p-6">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login Account'}
                </button>

                {/* Forgot Password Link */}
                <NavLink to="/forgotPassword" className="text-sm text-emerald-500 hover:underline mt-2 block text-right">
                  Forgot Password?
                </NavLink>
              </div>

              {/* Error Message Display */}
              {errorMsg && (
                <div className="p-4 mb-4 text-sm rounded-lg bg-red-500 text-white" role="alert">
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
