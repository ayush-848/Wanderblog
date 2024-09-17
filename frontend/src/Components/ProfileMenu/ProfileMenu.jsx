import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../assets/hamburger.png';
import styles from './profileMenu.module.css';
import useAuth from '../../hooks/useAuth';

function ProfileMenu() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.profileMenu}>
      <img
        src={user?.profilePic || Menu}
        alt="Profile"
        className={styles.profilePic}
        onClick={toggleDropdown}
      />
      <div className={`${styles.dropdownContent} ${dropdownVisible ? styles.show : ''}`}>
        {isAuthenticated && user ? (
          <>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{`${user.firstName || 'User'} ${user.lastName || ''}`}</p>
              <p className={styles.userEmail}>{user.email || 'No email available'}</p>
            </div>
            <Link to='/profile'>My Profile</Link>
            <Link to='/create-blog'>Create a New Blog</Link>
            <Link to='/settings'>Settings</Link>
            <Link to='/logout'>Logout</Link>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileMenu;