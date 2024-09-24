import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

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
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col p-5 max-w-[1200px] mx-auto bg-[#f4f4f9] rounded-lg shadow-md">
      {/* Profile Section */}
      <div className="flex flex-col mb-5">
        <div className="flex items-center mb-5">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              src={userData.profilePic || '/default-profile.png'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-5 text-lg text-gray-800">
            <p>Welcome, {userData.firstName}</p>
          </div>
        </div>
        {/* Account Details */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">{userData.phone}</p>
          <p className="text-gray-600">Last login: {userData.lastLogin}</p>
          <button className="bg-blue-600 text-white border-none px-5 py-2 rounded mt-2 hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* History */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="mb-2 text-gray-800">History</h3>
          <ul className="list-none p-0">
            {userData.history.length ? (
              userData.history.map((item, index) => (
                <li key={index} className="text-gray-600 mb-1">{item}</li>
              ))
            ) : (
              <li className="text-gray-600">No history available</li>
            )}
          </ul>
        </div>
        {/* Wishlist */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="mb-2 text-gray-800">Wishlist</h3>
          <ul className="list-none p-0">
            {userData.wishlist.length ? (
              userData.wishlist.map((item, index) => (
                <li key={index} className="text-gray-600 mb-1">{item}</li>
              ))
            ) : (
              <li className="text-gray-600">No items in wishlist</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
