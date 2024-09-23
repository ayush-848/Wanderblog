import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import travel_logo from '../assets/travel.png';

const Footer = () => {
  return (
    <>
      <style>
        {`
          @keyframes moving {
            0% {
              left: -20px;
            }
            100% {
              left: 100%;
            }
          }
          
          .custom-animation {
            width: 25px;
            height: 100%;
            background: #fff;
            border-radius: 3px;
            position: absolute;
            top: 0;
            left: 10px;
            animation: moving 2.5s linear infinite;
          }
        `}
      </style>

      <footer className="bg-gradient-to-r from-[#00093c] to-[#2d0b00] text-white py-12 px-0 rounded-t-[125px] font-poppins">
        <div className="max-w-[1200px] grid grid-cols-4 gap-4 mx-auto">

          {/* Logo Column */}
          <div className="flex justify-start items-start pl-5">
            <img src={travel_logo} className="w-[80px]" alt="Wanderblog Logo" />
          </div>

          {/* Office Column */}
          <div className="flex flex-col justify-start text-[16px]">
            <h3 className="relative mb-5 text-lg text-white font-sans">Office
              <div className="absolute top-7 left-0 w-[85%] h-[5px] bg-[#767676] rounded overflow-hidden">
                <span className="absolute top-0 left-[10px] w-[15px] h-full bg-white rounded custom-animation"></span>
              </div>
            </h3>
            <div className="leading-[1.6]">
              <p>Office Lane</p>
              <p>Melarmath</p>
              <p className="border-b-[1px] border-gray-300 inline-block">xyz@yahoo.com</p>
              <h4>+91 - 0123456789</h4>
            </div>
          </div>

          {/* Links Column */}
          <div className="flex flex-col justify-start text-[16px]">
            <h3 className="relative mb-5 text-lg text-white font-sans">Links
              <div className="absolute top-7 left-0 w-[85%] h-[5px] bg-[#767676] rounded overflow-hidden">
                <span className="absolute top-0 left-[10px] w-[15px] h-full bg-white rounded custom-animation"></span>
              </div>
            </h3>
            <ul>
              <li className="mb-3"><a href="/" className="text-white no-underline">Home</a></li>
              <li className="mb-3"><a href="/" className="text-white no-underline">About Us</a></li>
              <li className="mb-3"><a href="/" className="text-white no-underline">Contacts</a></li>
              <li className="mb-3"><a href="/" className="text-white no-underline">Suggestions</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col justify-start">
            <h3 className="relative mb-5 text-lg text-white font-sans">Newsletter
              <div className="absolute top-7 left-0 w-[85%] h-[5px] bg-[#767676] rounded overflow-hidden">
                <span className="absolute top-0 left-[10px] w-[15px] h-full bg-white rounded custom-animation"></span>
              </div>
            </h3>
            <form className="flex items-center mb-5">
              <i className="fa-regular fa-envelope text-[24px] mr-3"></i>
              <input
                type="email"
                placeholder=" Enter your email id"
                required
                className="flex-[0_1_200px] p-2 border border-gray-300 rounded text-black"
              />
              <button
                type="submit"
                className="bg-[#007bff] text-white p-2 ml-2 rounded">
                <i className="fa-solid fa-arrow-right text-[18px]"></i>
              </button>
            </form>

            {/* Social Media Icons */}
            <div className="flex gap-4 text-[24px]">
              <i className="fa-brands fa-facebook cursor-pointer transition-colors duration-300 hover:text-[#007bff]"></i>
              <i className="fa-brands fa-twitter cursor-pointer transition-colors duration-300 hover:text-[#007bff]"></i>
              <i className="fa-brands fa-instagram cursor-pointer transition-colors duration-300 hover:text-[#007bff]"></i>
              <i className="fa-brands fa-snapchat cursor-pointer transition-colors duration-300 hover:text-[#007bff]"></i>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="w-[90%] border-0 border-b-[1px] border-gray-300 my-5 mx-auto" />

        {/* Copyright */}
        <p className="text-center">&copy; WanderBlog &#8482; 2024 - All Rights Reserved</p>
      </footer>
    </>

  );
};

export default Footer;
