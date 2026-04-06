import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. The persistent Header */}

      
      {/* 2. The dynamic page content gets injected here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 3. The persistent Footer */}
  
    </div>
  );
};

// THIS IS THE LINE THAT WAS MISSING CAUSING YOUR CRASH
export default PublicLayout;