// src/components/Wishlist/WishlistIcon.jsx
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { WishlistContext } from '../../../Context/WishListContext';

export default function WishlistIcon({ productId, size = 'lg', className = '' }) {
  const { wishlistIds, toggleWishlist } = useContext(WishlistContext);
  const isInWishlist = wishlistIds.includes(productId);

  return (
    <button onClick={() => toggleWishlist(productId)} className={`text-red-500 ${className}`}>
      <FontAwesomeIcon
        icon={isInWishlist ? solidHeart : regularHeart}
        size={size}
        className={`transition-colors duration-300 ${isInWishlist ? 'text-red-600' : 'text-gray-400'}`}
      />
    </button>
  );
}
