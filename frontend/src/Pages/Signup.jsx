// src/components/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../assets/travel.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await register(formData);
      navigate('/profile');
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
      <div className='border-4 border-solid border-neutral-600 rounded-[30px] box-border w-full max-w-[80vh] px-8 py-8 mt-8 mb-8'>

        <div className='flex items-center justify-center'>
          <img src={logo} alt="WanderBlog Logo" className="h-12 w-auto" />
          <h2 className='text-5xl px-2 py-4 font-Fredoka'>Sign Up</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col py-4'>
            <label htmlFor="firstName" className='font-Outfit text-lg'>First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className='w-full h-10 border-2 border-gray-500 rounded-lg px-2 font-Outfit'
            />
          </div>
          <div className='flex flex-col py-4'>
            <label htmlFor="lastName" className='font-Outfit text-lg'>Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className='w-full h-10 border-2 border-gray-500 rounded-lg px-2 font-Outfit'
            />
          </div>
          <div className='flex flex-col py-4'>
            <label htmlFor="email" className='font-Outfit text-lg'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full h-10 border-2 border-gray-500 rounded-lg px-2 font-Outfit'
            />
          </div>
          <div className='flex flex-col py-4'>
            <label htmlFor="phone" className='font-Outfit text-lg'>Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className='w-full h-10 border-2 border-gray-500 rounded-lg px-2 font-Outfit'
            />
          </div>
          <div className='flex flex-col py-4'>
            <label htmlFor="password" className='font-Outfit text-lg'>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full h-10 border-2 border-gray-500 rounded-lg px-2 font-Outfit'
            />
          </div>
          <div className='flex flex-col py-4'>
            <label htmlFor="confirmPassword" className='font-Outfit text-lg'>Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='w-full h-10 border-2 border-gray-500 rounded-lg px-2 font-Outfit'
            />
          </div>

          <div className='flex items-center justify-center py-4'>
            <button
              type="submit"
              className='border-2 border-gray-700 w-full h-12 rounded-lg cursor-pointer hover:bg-purple-700 hover:text-white transition-colors duration-500 delay-50 font-Outfit text-lg'
            >
              Sign Up
            </button>
          </div>

        </form>

        <p className='font-Outfit text-xl mt-2'>
          Already have an account?  
          <Link to="/login" className='mx-2 text-decoration: underline hover:text-sky-500'>Login</Link>
        </p>
      </div>

    </div>
  );
};

export default SignUp;