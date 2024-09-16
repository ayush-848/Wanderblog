// src/components/ProfileMenu.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../assets/hamburger.png'; // Ensure this path is correct
import styles from './profileMenu.module.css'; // Ensure CSS module is correctly set up
import useAuth from '../../hooks/useAuth'; // Ensure useAuth hook is correctly imported

function ProfileMenu() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isAuthenticated, logout, user } = useAuth(); // Include user in the destructuring
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
        src={user?.profilePic || Menu} // Use user's profile pic if available, otherwise use Menu icon
        alt="Profile"
        className={styles.profilePic}
        onClick={toggleDropdown}
      />
      <div className={`${styles.dropdownContent} ${dropdownVisible ? styles.show : ''}`}>
        {isAuthenticated && user ? (
          <>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{`${user.firstName} ${user.lastName}`}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <Link to='/profile'>My Profile</Link>
            <Link to='/create-blog'>Create a New Blog</Link>
            <Link to='/settings'>Settings</Link>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
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
