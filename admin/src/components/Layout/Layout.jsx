import React, { useState, useEffect } from 'react';
import './layout.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="rentivaAdminLayout">
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar 
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle}
        isDesktop={isDesktop}
      />
      <main className={`rentivaAdminLayout__content ${!isDesktop && !mobileOpen ? 'rentivaAdminLayout__content--mobile' : ''}`}>
        <div className="rentivaAdminLayout__main">
          <Outlet />
        </div>
      </main>
      <ToastContainer 
        position="bottom-right" 
        theme="dark"
        toastClassName="rentivaAdminLayout__toast"
      />
    </div>
  );
};

export default Layout;
