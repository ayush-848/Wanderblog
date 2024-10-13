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
    <div className="flex flex-col md:flex-row  rounded-lg shadow-md w-3/4 h-3/4">
      {/* Left Profile Section */}
      <div className="backdrop-blur-sm  text-white flex flex-col  p-6 pr-4 rounded-lg w-full md:w-1/3 mb-5 md:mb-0 mr-2 relative">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4">
          <img
            src={userData.profilePic || '/default-profile.png'}
            alt="Profile"
            className="h-[12rem] w-[12rem] object-cover"
          />
        </div>
        <div class='absolute top-1/3'>
          <h1 className="text-3xl font-bold">{userData.firstName} {userData.lastName}</h1>
          <p className="mt-2">{userData.email}</p>
          <p className="mt-2">{userData.phone}</p>
          <p className="mt-2">Last login: {userData.lastLogin}</p>
          <button className="bg-white text-green-600 px-5 py-2 rounded mt-4 hover:bg-slate-50 hover:text-teal-400">
            Edit Profile
          </button>
        </div>
        {/* Icons Section */}
        <div className="flex mt-44 space-x-4 items-center justify-center absolute bottom-0">
          <div className="flex flex-col items-center hover:text-teal-400 cursor-pointer group" >
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="fill-current text-[#e8eaed] group-hover:text-teal-600"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" /></svg>
            <p className="mt-1">BLOGS</p>
          </div>
          <div className="flex flex-col items-center  hover:text-teal-400 cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="fill-current text-[#e8eaed] group-hover:text-teal-600"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
            <p className="mt-1">EDIT</p>
          </div>
          <div className="flex flex-col items-center  hover:text-teal-400 cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="fill-current text-[#e8eaed] group-hover:text-teal-600"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" /></svg>
            <p className="mt-1">Recent</p>
          </div>
          <div className="flex flex-col items-center  hover:text-teal-400 cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="fill-current text-[#e8eaed] group-hover:text-teal-600"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
            <p className="mt-1">Favourite</p>
          </div>
        </div>
      </div>

      {/* Right Details Section */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* History Section */}
        <div className="backdrop-blur-sm  p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">History</h3>
          <ul className="list-none p-0">
            {userData.history.length ? (
              userData.history.map((item, index) => (
                <li key={index} className="text-gray-600 mb-1">{item}</li>
              ))
            ) : (
              <li className="text-slate-400">No history available</li>
            )}
          </ul>
        </div>

        {/* Wishlist Section */}
        <div className=" backdrop-blur-sm p-5 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Wishlist</h3>
          <ul className="list-none p-0">
            {userData.wishlist.length ? (
              userData.wishlist.map((item, index) => (
                <li key={index} className="text-gray-600 mb-1">{item}</li>
              ))
            ) : (
              <li className="text-slate-400">No items in wishlist</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
