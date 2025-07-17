import React, { useState, useEffect, useContext } from 'react';
import './RecentProducts.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext';
import toast from 'react-hot-toast';
import WishlistIcon from '../WishlistIcone/WishlistIcone'; 

export default function RecentProducts() {
  const { addToCart } = useContext(CartContext);
  const [data, setData] = useState([]);

  async function addProductToCart(prodId) {
    try {
      const response = await addToCart(prodId);
      if (response.data?.status === 'success') {
        toast.success(response.data?.message);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Unexpected error occurred");
    }
  }

  function getAllProducts() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => setData(data?.data))
      .catch((error) => console.error("Error fetching products:", error));
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  if (data.length === 0) return <Spinner />;

  return (
    <div className="mt-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Recent Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition relative">
            {/* Wishlist Icon */}
            <WishlistIcon productId={product._id} className="absolute top-2 right-2 z-10" />

            <Link to={`/productDetails/${product._id}/${product.category.name}`}>
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-40 object-contain mb-2"
              />
              <span className="text-emerald-600 text-sm">{product.category?.name}</span>
              <h3 className="text-lg font-semibold truncate">
                {product.title.split(' ').slice(0, 2).join(' ')}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-800 font-medium">{product.price} EGP</span>
                <span className="text-yellow-400 flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} />
                  {product.ratingsAverage}
                </span>
              </div>
            </Link>

            <button
              onClick={() => addProductToCart(product._id)}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
