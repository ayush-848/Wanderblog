import React from 'react';
import './Navbar.css'; // Import your navbar CSS for styling
import { Link } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx';

function Navbar() {
    
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/src/assets/travel.png" className="navbar-logo"></img>
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
