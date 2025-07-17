import React from 'react';
import './Home.module.css';

import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import RecentProducts from '../RecentProducts/RecentProducts';

export default function Home() {
  return (
    <div className="mt-16"> 
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </div>
  );
}
