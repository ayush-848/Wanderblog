import React from 'react';
import Navbar from '../Components/Navbar';
import Profile_bg from '../assets/Profile_bg3.png';
import DashBoard from '../Components/Profile/Dashboard';

function Profile() {
    return (
        <>
            <Navbar />
            <img src={Profile_bg} alt="wooden bg" className="absolute -z-10 w-full h-full object-cover backdrop-blur-sm bg-black/50"/>
            <div class=' flex h-screen justify-center items-center back'>
                <DashBoard />
            </div>
        </>
    );
}

export default Profile;