// Import necessary dependencies and components
import React, { useContext } from 'react';
import './Cart.module.css';
import { CartContext } from '../../../Context/CartContext';
import Spinner from '../Spinner/Spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Cart component to display and manage items in the shopping cart
export default function Cart() {
  // Destructure values and functions from CartContext
  const {
    updateUserCart,
    totalCartPrice,
    numOfCartItems,
    products,
    deleteProduct,
    clearCart,
  } = useContext(CartContext);


  // Function to handle updating product quantity
  async function handelUpdate(prodId, count) {
    const response = await updateUserCart(prodId, count);
    if (response?.data?.status === 'success') {
      toast.success('Cart updated successfully');
    } else {
      toast.error('Try again later');
    }
  }

  // Function to handle deleting a product from the cart
  async function handelDelete(prodId) {
    const response = await deleteProduct(prodId);
    if (response?.data?.status === 'success') {
      toast.success('Product removed from cart');
    } else {
      toast.error('Try again later');
    }
  }

  // Function to clear the entire cart
  async function clearAllProducts() {
    if (confirm('Are you sure you want to clear the cart?')) {
      const response = await clearCart();
      if (response?.data?.status === 'success') {
        toast.success('Cart cleared successfully');
      } else {
        toast.error('Something went wrong');
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-[700px] w-full text-sm text-left text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
          <thead className="text-xs text-gray-600 uppercase bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* If there are products in the cart, map over them */}
            {products?.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.product._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* Product image */}
                  <td className="p-4">
                    <img
                      src={product?.product?.imageCover}
                      className="w-14 h-14 object-contain"
                      alt={product?.product?.title}
                    />
                  </td>

                  {/* Product title */}
                  <td className="px-4 py-4 font-medium max-w-[150px] truncate">
                    {product?.product?.title}
                  </td>

                  {/* Quantity with + / - buttons */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handelUpdate(product?.product._id, product.count - 1)}
                        disabled={product.count === 1}
                        className="h-6 w-6 rounded-full border text-sm font-bold flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        readOnly
                        value={product.count}
                        className="w-10 text-center border rounded bg-gray-50 dark:bg-gray-800"
                      />
                      <button
                        onClick={() => handelUpdate(product?.product._id, product.count + 1)}
                        className="h-6 w-6 rounded-full border text-sm font-bold flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Product price */}
                  <td className="px-4 py-4 font-semibold">{product?.price} EGP</td>

                  {/* Delete button */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handelDelete(product?.product._id)}
                      className="text-red-600 hover:underline hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // If cart is empty
              <tr>
                <td colSpan="5" className="py-10">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    {/* Cart empty icon */}
                    <svg
                      className="w-16 h-16 mb-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold">Your cart is empty</h2>
                    <p className="text-sm">Start adding products to fill it up.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>

          {/* Cart summary + action buttons */}
          <tfoot>
            <tr className="bg-gray-50 dark:bg-gray-800 border-t">
              <td colSpan="2" className="px-4 py-4 font-bold text-gray-800 dark:text-white">
                Order Summary
              </td>
              <td className="px-4 py-4 font-bold">{numOfCartItems} Items</td>
              <td className="px-4 py-4 font-bold">{totalCartPrice} EGP</td>
              <td className="px-4 py-4 text-center">
                <div className="flex flex-col gap-2 sm:flex-row justify-center">
                  {/* Link to checkout page */}
                  <Link
                    to="/checkout"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded transition text-center"
                  >
                    Checkout
                  </Link>

                  {/* Clear cart button */}
                  <button
                    onClick={clearAllProducts}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
