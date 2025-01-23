import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Logout = ({ open, handleClose }) => {
  const { logout } = useAuth(); // Using custom logout from your useAuth hook
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await logout(); // Calling your custom logout function
      handleClose();  // Closing the logout modal
      navigate('/home');  // Redirecting user to the login page after logout
    } catch (error) {
      console.error('Logout failed:', error);  // Handling any errors during logout
    }
  };

  if (!open) return null;  // If the modal is not open, render nothing

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-80"
        onClick={(e) => e.stopPropagation()}  // Prevent modal from closing when clicking inside it
      >
        <h3 className="text-xl font-semibold text-center">Confirm Logout</h3>
        <p className="text-center text-gray-600 mt-4">
          Are you sure you want to log out?
        </p>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleClose}  // Closes the modal without logging out
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLogout}  // Handles the logout action
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
