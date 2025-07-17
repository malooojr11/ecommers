// src/components/Wishlist/Wishlist.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(null);

  // Fetch wishlist data from API
  async function getWishlist() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      });

      setWishlist(data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  if (!wishlist) return <Spinner />;

  return (
    <div className="p-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-emerald-600">My Wishlist ❤️</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
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
          </div>
        ))}
      </div>
    </div>
  );
}
