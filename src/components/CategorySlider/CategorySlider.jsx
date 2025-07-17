import React, { useState, useEffect } from 'react';
import './CategorySlider.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
  // Slider settings for responsiveness and autoplay
  const settings = {
    dots: false,               // Disable navigation dots
    infinite: true,            // Infinite loop
    speed: 600,                // Transition speed
    slidesToShow: 7,           // Default number of slides shown
    slidesToScroll: 2,         // Number of slides to scroll at once
    arrows: false,             // Disable navigation arrows
    autoplay: true,            // Enable autoplay
    autoplaySpeed: 2500,       // Time between slides in ms
    pauseOnHover: true,        // Pause autoplay on hover
    responsive: [              // Responsive breakpoints
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // State to hold all fetched categories
  const [allCategories, setAllCategories] = useState(null);

  // Fetch categories from API on component mount
  useEffect(() => {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        // Store the categories in state
        setAllCategories(data?.data);
      });
  }, []);

  return (
    <section className="my-8 w-full px-4 md:px-10">
      {/* Section heading */}
      <h2 className="text-3xl font-semibold text-center text-emerald-600 mb-6">Shop by Category</h2>

      {/* Category slider */}
      <Slider {...settings} className="w-full">
        {allCategories?.map((category) => (
          <div key={category._id} className="px-2">
            <Link to={`/categories/${category._id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg p-3 transition-all duration-300 flex flex-col items-center justify-center">
                {/* Category image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-[160px] w-full object-cover rounded-md mb-3 hover:scale-105 transition-transform duration-300"
                />
                {/* Category name */}
                <h3 className="text-sm md:text-base font-medium text-center text-gray-800">{category.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
}
