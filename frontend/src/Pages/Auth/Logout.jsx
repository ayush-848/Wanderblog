// src/pages/Logout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Box, Button, Modal, Typography } from '@mui/material';

const Logout = ({ open, handleClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await logout();
      handleClose();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='logout-dialog-title'
        aria-describedby='logout-dialog-description'
      >
        <Box
          className='p-8 bg-white rounded-lg shadow-lg w-80'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography id='logout-dialog-title' variant='h6' component='h2'>
            Confirm Logout
          </Typography>

          <Typography id='logout-dialog-description' className='mt-2 text-gray-600'>
            Are you sure you want to log out ?
          </Typography>

          <div className='mt-6 flex justify-end space-x-5'>
            <Button
              onClick={handleClose}
              variant='outlined'
              className='!text-gray-700 !border-gray-300'
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmLogout}
              variant='contained'
              color='error'
              className='!bg-red-500 !hover:bg-red-600 !text-white'
            >
              Logout
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Logout;
