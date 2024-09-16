import React from 'react';
import './Navbar.css'; // Import your navbar CSS for styling
import { Link } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx';
import logo from '../../assets/travel.png'; // Import the image

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="WanderBlog Logo" className="navbar-logo" />
                <Link to="/">WanderBlog</Link>
            </div>

            <ul className="navLinks">
                <li><Link to='/'>Home</Link></li>
                <li><a href="/blog">Blogs</a></li>
                <li><a href="/community">Community</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>

            <ProfileMenu />
        </nav>
    );
}

export default Navbar;
