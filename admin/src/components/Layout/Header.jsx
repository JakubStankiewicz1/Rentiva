import React, { useEffect, useRef } from 'react';
import './header.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleDrawerToggle }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userMenuRef = useRef(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    };
    if (anchorEl) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <header className={`rentivaAdminHeader ${!handleDrawerToggle ? 'rentivaAdminHeader--mobile' : ''}`}>
      <div className="rentivaAdminHeader__left">
        {/* <button
          className={`rentivaAdminHeader__menuButton ${handleDrawerToggle ? 'rentivaAdminHeader__menuButton--mobile' : ''}`}
          onClick={handleDrawerToggle}
          aria-label="Open navigation menu"
        >
          ☰
        </button> */}
        <p className="rentivaAdminHeader__title">Admin Panel</p>
      </div>
      
      <div className="rentivaAdminHeader__right">
        {/* <button className="rentivaAdminHeader__notifications" aria-label="Notifications">
          🔔
          <span className="rentivaAdminHeader__notificationsBadge">4</span>
        </button> */}
          <div className="rentivaAdminHeader__userSection" ref={userMenuRef}>
          <button
            className="rentivaAdminHeader__userButton"
            onClick={handleMenu}
            aria-label="User menu"
          >
            <div className="rentivaAdminHeader__avatar">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <p className={`rentivaAdminHeader__userName ${!handleDrawerToggle ? 'rentivaAdminHeader__userName--mobile' : ''}`}>
              {currentUser?.name || 'Administrator'}
            </p>
          </button>
          
          <div className={`rentivaAdminHeader__userMenu ${!anchorEl ? 'rentivaAdminHeader__userMenu--hidden' : ''}`}>
            <button className="rentivaAdminHeader__menuItem" onClick={handleClose}>
              Profile
            </button>
            <button className="rentivaAdminHeader__menuItem" onClick={handleClose}>
              Settings
            </button>
            <div 
              className="rentivaAdminHeader__menuItem rentivaAdminHeader__menuItem--logout" 
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
