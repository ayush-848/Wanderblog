import styles from "./navbar.module.css";
import { useState } from "react";

export function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    
    
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blogs</a></li>
                <li><a href="/community">Community</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>

            <div className={styles.profileMenu}>
                <img 
                    src="/path/to/profile-pic.jpg" 
                    alt="Profile" 
                    className={styles.profilePic} 
                    onClick={toggleDropdown} 
                />
                {dropdownVisible && (
                    <div className={styles.dropdownContent}>
                        <a href="/My profile">My Profile</a>
                        <a href="/Create-Blog">Create a New Blog</a>
                        <a href="/settings">Settings</a>
                        <a href="/logout">Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
}

