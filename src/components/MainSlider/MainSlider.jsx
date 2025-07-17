import React, { useState, useEffect } from 'react';
import './MainSlider.module.css';
import img1 from '../../assets/images/1.png';
import img2 from '../../assets/images/2.png';
import img3 from '../../assets/images/3.png';
import img4 from '../../assets/images/4.png';
import img5 from '../../assets/images/5.png';
import img6 from '../../assets/images/6.png';
import img7 from '../../assets/images/7.png';
import img8 from '../../assets/images/8.png';
import Slider from 'react-slick';

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Main Slider */}
      <div className="w-full lg:w-3/4">
        <Slider {...settings} className="rounded-lg overflow-hidden">
          {[img3, img4, img1, img2, img5, img6, img7, img8].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
          ))}
        </Slider>
      </div>

      {/* Side Ads */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <img
          src={img1}
          alt="Ad 1"
          className="w-full h-[150px] sm:h-[180px] md:h-[240px] rounded-md object-cover shadow"
        />
        <img
          src={img2}
          alt="Ad 2"
          className="w-full h-[150px] sm:h-[180px] md:h-[240px] rounded-md object-cover shadow"
        />
      </div>
    </div>
  );
}
