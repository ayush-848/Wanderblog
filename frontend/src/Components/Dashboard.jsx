import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPlane, faClock } from '@fortawesome/free-solid-svg-icons';

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
    <div className="flex flex-col md:flex-row p-5 max-w-[1200px] max-h-[800px] mx-auto bg-[#f4f4f9] rounded-lg shadow-md mt-[10rem]">
      {/* Left Profile Section */}
      <div className="bg-green-600 text-white flex flex-col items-center p-6 pr-2 rounded-lg w-full md:w-1/3 mb-5 md:mb-0 mr-2 ">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4">
          <img
            src={userData.profilePic || '/default-profile.png'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold">{userData.firstName} {userData.lastName}</h1>
        <p className="mt-2">{userData.email}</p>
        <p className="mt-2">{userData.phone}</p>
        <p className="mt-2">Last login: {userData.lastLogin}</p>
        <button className="bg-white text-green-600 px-5 py-2 rounded mt-4 hover:bg-slate-50 hover:text-teal-400">
          Edit Profile
        </button>
        {/* Icons Section */}
        <div className="flex mt-6 space-x-4 ">
          <div className="flex flex-col items-center hover:text-teal-400">
            <FontAwesomeIcon icon={faGlobe} size="2x" />
            <p className="mt-1">Travel</p>
          </div>
          <div className="flex flex-col items-center  hover:text-teal-400">
            <FontAwesomeIcon icon={faPlane} size="2x" />
            <p className="mt-1">Flights</p>
          </div>
          <div className="flex flex-col items-center  hover:text-teal-400">
            <FontAwesomeIcon icon={faClock} size="2x" />
            <p className="mt-1">Recent</p>
          </div>
        </div>
      </div>

      {/* Right Details Section */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* History Section */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">History</h3>
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

        {/* Wishlist Section */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Wishlist</h3>
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
