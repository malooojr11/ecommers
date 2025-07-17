import React, { useState, useEffect } from "react";
import "./BrandDetails.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

// BrandDetails component displays details of a brand and its products
export default function BrandDetails() {
  // Get brand ID from URL parameters
  const { id } = useParams();

  // State to store brand details
  const [brand, setBrand] = useState(null);
  // State to store products of the brand
  const [products, setProducts] = useState(null);

  // Fetch brand details from API
  function fetchBrand(brandId) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`)
      .then(({ data }) => setBrand(data.data))
      .catch((err) => console.error("Brand error:", err));
  }

  // Fetch products for the brand from API
  function fetchBrandProducts(brandId) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
      .then(({ data }) => setProducts(data.data))
      .catch((err) => console.error("Products error:", err));
  }

  // Fetch brand and products when component mounts or brand ID changes
  useEffect(() => {
    fetchBrand(id);
    fetchBrandProducts(id);
  }, [id]);

  // Show spinner while loading data
  if (!brand || !products) return <Spinner />;

  return (
    // Main container
    <div className="container mx-auto px-4 py-10" key={brand._id}>
      {/* Brand image and name */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-48 h-48 object-contain rounded shadow"
        />
        <h2 className="text-2xl font-bold">{brand.name}</h2>
      </div>

      {/* Brand products section */}
      <h3 className="text-xl font-semibold mb-6 text-center">
        Products by {brand.name}
      </h3>

      {/* Show message if no products, else show product grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products for this brand.</p>
      ) : (
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((prod) => (
            // Link to product details page
            <Link to={`/productDetails/${prod._id}/${prod.category.name}`}>
              <div
                key={prod._id}
                className="border p-4 rounded-lg hover:shadow-lg transition"
              >
                {/* Product image */}
                <img
                  src={prod.imageCover}
                  alt={prod.title}
                  className="w-full h-40 object-contain mb-3"
                />
                {/* Product title */}
                <h4 className="text-sm font-medium truncate mb-1">
                  {prod.title}
                </h4>
                {/* Product price */}
                <p className="text-gray-500 mb-2">{prod.price}EGP</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )}