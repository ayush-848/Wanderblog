import React, { useState } from 'react';
import './Navbar.css'; // Import your navbar CSS for styling
import Menu from '../../assets/hamburger.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/">Logo</a>
            </div>

            <ul className="navLinks">
                <li><Link to='/'>Home</Link></li>
                <li><a href="/blog">Blogs</a></li>
                <li><a href="/community">Community</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>

            <div className="profileMenu">
                <img
                    src={Menu}
                    alt="Profile"
                    className="profilePic"
                    onClick={toggleDropdown}
                />
                <div className={`dropdownContent ${dropdownVisible ? 'show' : ''}`}>
                    
                    <Link to='/profile'>My Profile</Link>
                    <a href="/create-blog">Create a New Blog</a>
                    <a href="/settings">Settings</a>
                    <a href="/logout">Logout</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
