// Layout.jsx
import React from 'react';
import './Layout.module.css';

// ✅ Components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-[80vh] px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
