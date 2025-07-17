import React, { useContext, useState, useEffect } from 'react';
import './ProductDetails.module.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Spinner from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  // Hooks for state and route parameters
  const [data, setData] = useState(null); // Stores the main product details
  const [relatedProducts, setRelatedProducts] = useState(null); // Stores related products
  const { id, category } = useParams(); // Extract product ID and category from URL
  const { addToCart } = useContext(CartContext); // Access cart context

  // Fetch details for the selected product
  function fetchData(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log('Product Details:', data?.data);
        setData(data?.data);
      });
  }

  // Get all products and filter the ones with the same category as current
  function getAllProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        console.log('Products Data:', data?.data, 'Category:', category);
        const related = data?.data.filter((prod) => prod.category.name === category);
        console.log('Related Products:', related);
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  // Add a product to the cart and handle response
  function handleAddToCart(productId) {
    addToCart(productId)
      .then((res) => {
        if (res.data.status === 'success') {
          toast.success('Added to cart!', { duration: 2000 });
        } else {
          toast.error('Could not add to cart.');
        }
      })
      .catch((err) => {
        console.error("Add to cart error:", err);
        toast.error('Error adding product.');
      });
  }

  // Run once on component mount to fetch product and related products
  useEffect(() => {
    fetchData(id);
    getAllProducts();
  }, []);

  // Settings for the product image slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      {/* Show loading spinner if product is not loaded yet */}
      {!data ? <Spinner /> : (
        <div className="flex flex-col lg:flex-row items-center justify-center mt-20 p-10">
          {/* Product Image Slider */}
          <div className="w-full lg:w-1/4 flex justify-center">
            <Slider {...settings} className="w-full">
              {data?.images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className='w-full h-auto object-contain rounded'
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-3/4 flex flex-col justify-center items-start p-6">
            <h2 className='text-3xl font-bold mb-2'>{data?.title}</h2>
            <p className='text-lg text-gray-700 mb-2'>{data?.description}</p>
            <span className='text-emerald-700 text-xl font-semibold mb-2'>{data?.price} EGP</span>
            <div className='flex items-center mb-4'>
              <span className='text-yellow-400 font-medium'>
                Rating: {data?.ratingsAverage}
              </span>
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(data._id)}
              className='px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all w-fit'
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      <div className='mt-10 p-6'>
        <h3 className='text-2xl text-green-500 text-center font-bold'>Related Products</h3>
        <div className="flex flex-wrap">
          {relatedProducts?.map((product) => (
            <div className="product p-3 m-3 w-full lg:w-1/6" key={product.id}>
              {/* Product Card Link */}
              <Link to={`/productDetails/${product._id}/${product.category.name}`} className='w-full lg:w-1/6'>
                <img src={product.imageCover} className='w-max' alt={product.title} />
                <span className='text-emerald-600'>{product.category?.name}</span>
                <h3 className='text-lg font-semibold'>
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h3>
                <div className='flex justify-between items-center'>
                  <span>{product.price} EGP</span>
                  <span className='text-yellow-300'>
                    <FontAwesomeIcon icon={faStar} size="x" />
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              {/* Add to Cart Button for Related Product */}
              <button
                onClick={() => handleAddToCart(product._id)}
                className='w-full py-5 rounded-md bg-emerald-600 m-2 hover:bg-emerald-300 transition-all'
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
