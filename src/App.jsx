import { useState,useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Resignation from './components/resignation/resignation'
import CounterContextProvider from '../Context/CounterContext'
import UserContextProider from '../Context/UserContext'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import BrandDetails from './components/BrandDetails/BrandDetails'
import Categories from './components/Categories/Categories'
import CartContextProvider from '../Context/CartContext'
import CategoryProducts from './components/CategoryProducts/CategoryProducts'
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Checkout from './components/Checkout/Checkout';
import { WishlistProvider } from '../Context/WishListContext';
import Wishlist from './components/Wishlist/Wishlist'

let queryClient = new QueryClient()

let route = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'brands/:id', element: <ProtectRoute><BrandDetails /></ProtectRoute> },
      { path: 'categories/:id', element: <ProtectRoute><CategoryProducts /></ProtectRoute> },
      { path: 'productDetails/:id/:category', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'wishlist', element: <ProtectRoute><Wishlist /></ProtectRoute> },
      { path: 'checkout', element: <ProtectRoute><Checkout /></ProtectRoute> },
      { path: 'login/', element: <Login /> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'verifyResetCode', element: <VerifyResetCode /> },
      { path: 'resignation', element: < Resignation /> },
    ]
  }
])

function App() {
  useEffect(() => {
    document.title = "ECOMMERS "  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProider>
        <CartContextProvider>
          <CounterContextProvider>
            <WishlistProvider>
              <RouterProvider router={route} />
              <Toaster />
            </WishlistProvider>
          </CounterContextProvider>
        </CartContextProvider>
      </UserContextProider>
    </QueryClientProvider>

  )
}

export default App
