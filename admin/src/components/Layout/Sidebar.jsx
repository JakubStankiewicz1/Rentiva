import React from 'react';
import './sidebar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ mobileOpen, handleDrawerToggle, isDesktop }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  
  const menuItems = [
    { text: 'Dashboard', icon: '📊', path: '/' },
    { text: 'Cars', icon: '🚗', path: '/cars' },
    { text: 'Reservations', icon: '📋', path: '/reservations' },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine sidebar class based on screen size and state
  const getSidebarClass = () => {
    if (isDesktop) {
      return 'rentivaAdminSidebar';
    } else {
      return `rentivaAdminSidebar ${mobileOpen ? 'rentivaAdminSidebar--mobileOpen' : 'rentivaAdminSidebar--mobile'}`;
    }
  };

  return (
    <>
      {!isDesktop && mobileOpen && (
        <div 
          className="rentivaAdminSidebar__overlay rentivaAdminSidebar__overlay--visible"
          onClick={handleDrawerToggle}
        />
      )}
      
      <nav className={getSidebarClass()}>
        <div className="rentivaAdminSidebar__header">
          <p className="rentivaAdminSidebar__logo">Rentiva Admin</p>
        </div>
        
        <div className="rentivaAdminSidebar__nav">
          <ul className="rentivaAdminSidebar__menuList">
            {menuItems.map((item) => (
              <li key={item.text} className="rentivaAdminSidebar__menuItem">
                <Link 
                  to={item.path}
                  className={`rentivaAdminSidebar__menuLink ${
                    location.pathname === item.path ? 'rentivaAdminSidebar__menuLink--active' : ''
                  }`}
                  onClick={!isDesktop && mobileOpen ? handleDrawerToggle : undefined}
                >
                  {/* <span className="rentivaAdminSidebar__menuIcon">{item.icon}</span> */}
                  <p className="rentivaAdminSidebar__menuText">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
          
          
          <div className="rentivaAdminSidebar__logoutSection">
            <button 
              className="rentivaAdminSidebar__logoutButton"
              onClick={handleLogout}
            >
              
              {/* <span className="rentivaAdminSidebar__logoutIcon">🚪</span> */}
              <p className="rentivaAdminSidebar__menuText">Logout</p>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
