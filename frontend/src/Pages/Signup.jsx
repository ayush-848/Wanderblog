// src/components/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../assets/travel.png';
import signupBg from '../assets/signup_bg.jpg';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    //for phone, restrict to numbers
    if (name === 'phone') {
      setFormData({ ...formData, [name]: value.replace(/[^0-9]/g, '') });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const togglePasswordVisible = () => {
    setShowPassword(!showPassword);
  }
  const togglePasswordVisible2 = () => {
    setShowPassword2(!showPassword2);
  }

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
    <div
      className='w-full h-full bg-cover bg-center backdrop-blur-lg'
      style={{ backgroundImage: `url(${signupBg})` }}
    >

      
      
      <div className="w-full md:w-1/2 lg:w-[50%] max-w-3xl mx-32 py-4">
        <div className="bg-transparent w-[80%] sm:p-8 p-6 shadow-md rounded-2xl overflow-hidden border-2 inset-0 bg-gray-100 bg-opacity-10 backdrop-blur-md">

          <div className="w-full md:w-[80%] lg:w-[80%] max-w-4xl mx-auto">
            <div className="mb-4 flex items-center">
              <img src={logo} alt="WanderBlog Logo" className="h-10 w-auto mr-2" />
              <h2 className="text-black/80 text-3xl font-bold">Sign Up</h2>
            </div>

            {error && <div className="text-red-600 text-xl font-bold mb-2 flex justify-center">{error}</div>}

            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="text-white mb-2 block font-medium">Name</label>
                  <div className="relative flex items-center mb-2">
                    <input
                      id="name" name="name" type="text"
                      placeholder="Enter name"
                      required className={`bg-gray-50 border border-gray-300 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-md outline-blue-500 ${formData.name.trim() !== "" ? "font-medium" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24" aria-label="User icon">
                      <circle cx="10" cy="7" r="6"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"></path>
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-white mb-2 block font-medium">Email Id</label>
                  <div className="relative flex items-center mb-2">
                    <input
                      id="email" name="email" type="email"
                      placeholder="Enter email"
                      required className={`bg-gray-50 border border-gray-300 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-md outline-blue-500 ${formData.email.trim() !== "" ? "font-medium" : ""}`}
                      value={formData.email}
                      onChange={handleChange} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667" aria-label="Email icon">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z"></path>
                        </clipPath>
                      </defs>
                      <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"></path>
                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="text-white mb-2 block font-medium">Phone No</label>
                  <div className="relative flex items-center mb-2">
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="Enter Phone No"
                      required className={`bg-gray-50 border border-gray-300 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-md outline-blue-500 ${formData.phone.trim() !== "" ? "font-medium" : ""}`}
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" viewBox="0 0 28.314 28.323" aria-label="Phone icon" className="w-4 h-4 absolute right-4 cursor-pointer" xmlSpace="preserve">
                      <path d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 0 0 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="text-white mb-2 block font-medium">Password</label>
                  <div className="relative flex items-center mb-2">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      required className={`bg-gray-50 border border-gray-300 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-md outline-blue-500 ${formData.password.trim() !== "" ? "font-medium" : ""}`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                      aria-label="Password icon"
                      onClick={togglePasswordVisible}
                    >
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="text-white mb-2 block font-medium">Confirm Password</label>
                  <div className="relative flex items-center mb-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Enter password"
                      required className={`bg-gray-50 border border-gray-300 w-full text-gray-800 text-sm pl-4 pr-10 py-2.5 rounded-md outline-blue-500 ${formData.confirmPassword.trim() !== "" ? "font-medium" : ""}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                      viewBox="0 0 128 128"
                      aria-label="Password icon"
                      onClick={togglePasswordVisible2}
                    >
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                    </svg>
                  </div>
                </div>

                <div className='!mt-8'>
                  <button type="button"
                    className="w-full px-5 py-2.5 flex items-center justify-center rounded-md text-gray-800 text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22px" fill="#fff" className="inline shrink-0 mr-4" viewBox="0 0 512 512">
                      <path fill="#fbbd00"
                        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                        data-original="#fbbd00" />
                      <path fill="#0f9d58"
                        d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                        data-original="#0f9d58" />
                      <path fill="#31aa52"
                        d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                        data-original="#31aa52" />
                      <path fill="#3c79e6"
                        d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                        data-original="#3c79e6" />
                      <path fill="#cf2d48"
                        d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                        data-original="#cf2d48" />
                      <path fill="#eb4132"
                        d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                        data-original="#eb4132" />
                    </svg>
                    Sign Up with Google
                  </button>
                </div>

                <div className='flex justify-center my-4 font-semibold text-white'>
                  OR
                </div>

                <div className="!mt-4">
                  <button type="submit" className="w-full py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none">
                    Create Account
                  </button>
                </div>

                <p className="text-white mt-6 text-center flex justify-center">
                  Already have an account?
                  <Link to="/login">
                    <span className='text-blue-800 font-semibold hover:underline ml-1'>Login here</span>
                  </Link>
                </p>
              </form>
            </div>


          </div>
        </div>
      </div>

    </div>
  );
};

export default SignUp;