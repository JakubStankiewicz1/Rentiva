import React, { useState } from 'react';
import './layout.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className="rentivaAdminLayout">
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <main className={`rentivaAdminLayout__content ${mobileOpen ? '' : 'rentivaAdminLayout__content--mobile'}`}>
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
