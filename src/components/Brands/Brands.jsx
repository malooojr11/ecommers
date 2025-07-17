import React from 'react';
import './Brands.module.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Brands component displays all available brands
export default function Brands() {
  // Function to fetch brands from API
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  // Use React Query to fetch brands and handle loading state
  let { data, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  });

  // Extract brands array from API response
  const brands = data?.data?.data; // array of brands

  return (
    // Main container for brands grid
    <div className="flex flex-wrap justify-center items-center gap-6 m-15 p-15">
      {/* Show spinner while loading, else show brands or message */}
      {isLoading ? (
        <Spinner />
      ) : brands?.length > 0 ? (
        brands.map((brand) => (
          // Brand image with link to brand details
          <div className="image" key={brand._id}><Link to={`/brands/${brand._id}`}>
              <img
                src={brand.image}
                alt={brand.name}
                className="object-contain border rounded-md shadow-sm hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
        ))
      ) : (
        // Message if no brands found
        <p>No brands found.</p>
      )}
    </div>
  );
}