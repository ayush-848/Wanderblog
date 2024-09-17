// src/pages/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect back to home or any other page
  };

  return (
    <div className="logout-container">
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleConfirmLogout}>Yes, Log out</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Logout;
