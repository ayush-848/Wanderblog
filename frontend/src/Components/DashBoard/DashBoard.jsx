import React, { useEffect, useState } from 'react';
import styles from './DashBoard.module.css';
import useAuth from '../../hooks/useAuth';

const DashBoard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    profilePic: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lastLogin: '',
    history: [],
    wishlist: [],
    savedAddresses: [],
    paymentMethods: [],
    recentActivities: [],
    notifications: []
  });

  useEffect(() => {
    if (user) {
      setUserData({
        profilePic: user.profilePic || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        lastLogin: user.lastLogin || 'N/A',
        history: user.history || [],
        wishlist: user.wishlist || [],
        savedAddresses: user.savedAddresses || [],
        paymentMethods: user.paymentMethods || [],
        recentActivities: user.recentActivities || [],
        notifications: user.notifications || []
      });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImg}>
            <img src={userData.profilePic || '/default-profile.png'} alt="Profile" />
          </div>
          <div className={styles.greeting}>
            <p>Welcome, {userData.firstName}</p>
          </div>
        </div>
        {/* Account Details */}
        <div className={styles.accountDetails}>
          <h1 className={styles.accountName}>{userData.firstName} {userData.lastName}</h1>
          <p className={styles.accountEmail}>{userData.email}</p>
          <p className={styles.accountNumber}>{userData.phone}</p>
          <p className={styles.accountLastLogin}>Last login: {userData.lastLogin}</p>
          <button className={styles.editProfileBtn}>Edit Profile</button>
        </div>
      </div>
      {/* Details Section */}
      <div className={styles.detailsSection}>
        {/* History */}
        <div className={styles.history}>
          <h3>History</h3>
          <ul>
            {userData.history.length ? userData.history.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No history available</li>}
          </ul>
        </div>
        {/* Wishlist */}
        <div className={styles.wishlist}>
          <h3>Wishlist</h3>
          <ul>
            {userData.wishlist.length ? userData.wishlist.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No items in wishlist</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
