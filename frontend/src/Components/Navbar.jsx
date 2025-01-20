import React from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from '../Components/ProfileMenu';
import logo from '../assets/travel.png'; // Import the image

function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-black bg-opacity-30 flex justify-between p-3.5">
            {/* Logo Section */}
            <div className="flex items-center w-24">
                <img src={logo} alt="WanderBlog Logo" className="h-10 w-auto mr-2" />
                <Link to="/" className="text-white text-3xl font-bold transition-colors duration-300 hover:text-gray-300">
                    WanderBlog
                </Link>
            </div>

            {/* Navigation Links */}
            <ul className="list-none flex items-center justify-center space-x-6 m-0 p-0 cursor-pointer">
                <li>
                    <Link to="/" className="text-white text-lg px-4 py-1 transition-colors duration-300 hover:text-gray-500 hover:rounded-md">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/blogs" className="text-white text-lg px-4 py-1 transition-colors duration-300 hover:text-gray-500 hover:rounded-md">
                        Blogs
                    </Link>
                </li>
                <li>
                    <a href="/community" className="text-white text-lg px-4 py-1 transition-colors duration-300 hover:text-gray-500 hover:rounded-md">
                        Community
                    </a>
                </li>
                <li>
                    <a href="/contact" className="text-white text-lg px-4 py-1 transition-colors duration-300 hover:text-gray-500 hover:rounded-md">
                        Contact Us
                    </a>
                </li>
            </ul>

            {/* Profile Menu Component */}
            <ProfileMenu />
        </nav>
    );
}

export default Navbar;
