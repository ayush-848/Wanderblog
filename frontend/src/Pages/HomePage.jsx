import React from 'react';
import FeatureCard from '../Components/Home/FeatureCard';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Home/Hero';
import SeasonalTravelTimeline from '../Components/Home/SeasonalTravelTimeline';
import Footer from '../Components/Home/Footer';

const HomePage = () => {
    return (
        <div className="bg-gray-100 text-gray-800">
            <Navbar />

            {/* Hero Section */}
            <Hero />
            <SeasonalTravelTimeline />

            {/* Features Section */}
            <FeatureCard />

            {/* Call to Action Section */}
            <section className="py-16 bg-gradient-to-r from-green-50 to-green-200 shadow-md">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-extrabold mb-6 text-gray-900">Join Our Community</h2>
                    <p className="text-lg mb-4 text-gray-600">Sign up for exclusive offers, travel tips, and inspiration delivered to your inbox.</p>
                    <button className="bg-teal-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105">
                        Sign Up Now
                    </button>
                </div>
            </section>

            {/* Footer Section */}
            <Footer/>
        </div>
    );
};

export default HomePage;
