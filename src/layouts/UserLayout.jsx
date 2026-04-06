import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const UserLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      
      {/* 1. The Smart Header (Automatically knows you are logged in) */}
      <Header />

      {/* 2. The Page Content (MyEvents, Profile, etc. injects here) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 3. The Footer */}
      <Footer />
      
    </div>
  );
};

export default UserLayout;