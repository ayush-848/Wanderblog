import React, { useEffect, useState } from 'react';
import styles from './DashBoard.module.css';
import useAuth from '../../hooks/useAuth'; // Import useAuth hook

const DashBoard = () => {
    const { user } = useAuth(); // Access user data from useAuth hook
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
            // Update state with user data from the hook
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
            <div className={styles.profileSection}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileImg}>
                        <img src={userData.profilePic || '/default-profile.png'} alt="Profile" />
                    </div>
                    <div className={styles.greeting}>
                        <p>Good Evening, {userData.firstName}</p>
                    </div>
                </div>
                <div className={styles.accountDetails}>
                    <h1 className={styles.accountName}>{userData.firstName} {userData.lastName}</h1>
                    <p className={styles.accountEmail}>{userData.email}</p>
                    <p className={styles.accountNumber}>{userData.phone}</p>
                    <p className={styles.accountLastLogin}>Last login: {userData.lastLogin}</p>

                    <button className={styles.editProfileBtn}>Edit Profile</button>

                    <div className={styles.profileCompletion}>
                        <p>Profile completion: 100%</p>
                        <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.detailsSection}>
                <div className={styles.history}>
                    <h3>History</h3>
                    <ul>
                        {userData.history.length ? userData.history.map((item, index) => (
                            <li key={index}>{item}</li>
                        )) : <li>No history available</li>}
                    </ul>
                </div>
                <div className={styles.wishlist}>
                    <h3>Wishlist</h3>
                    <ul>
                        {userData.wishlist.length ? userData.wishlist.map((item, index) => (
                            <li key={index}>{item}</li>
                        )) : <li>No items in wishlist</li>}
                    </ul>
                </div>
                <div className={styles.savedAddresses}>
                    <h3>Saved Addresses</h3>
                    <ul>
                        {userData.savedAddresses.length ? userData.savedAddresses.map((address, index) => (
                            <li key={index}>{address}</li>
                        )) : <li>No saved addresses</li>}
                    </ul>
                </div>
                <div className={styles.payment}>
                    <h3>Payment Methods</h3>
                    <ul>
                        {userData.paymentMethods.length ? userData.paymentMethods.map((method, index) => (
                            <li key={index}>{method}</li>
                        )) : <li>No payment methods</li>}
                    </ul>
                </div>
                <div className={styles.recentActivities}>
                    <h3>Recent Activities</h3>
                    <ul>
                        {userData.recentActivities.length ? userData.recentActivities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        )) : <li>No recent activities</li>}
                    </ul>
                </div>
                <div className={styles.notifications}>
                    <h3>Notifications</h3>
                    <ul>
                        {userData.notifications.length ? userData.notifications.map((notification, index) => (
                            <li key={index}>{notification}</li>
                        )) : <li>No notifications</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
