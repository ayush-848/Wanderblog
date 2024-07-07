import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../assets/hamburger.png';
import styles from './profileMenu.module.css'; // Assuming your CSS module file is named profileMenu.module.css

function ProfileMenu() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={styles.profileMenu}>
      <img
        src={Menu}
        alt="Profile"
        className={styles.profilePic}
        onClick={toggleDropdown}
      />
      <div className={`${styles.dropdownContent} ${dropdownVisible ? styles.show : ''}`}>
        <Link to='/profile'>My Profile</Link>
        <a href="/create-blog">Create a New Blog</a>
        <a href="/settings">Settings</a>
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
}

export default ProfileMenu;
