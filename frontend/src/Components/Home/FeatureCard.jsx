import React from 'react';

// Example data for features with real Picsum images
const features = [
    {
        title: "Cultural Experiences",
        description: "Immerse yourself in local traditions and cultures.",
        image: "https://picsum.photos/id/1018/400/300",
    },
    {
        title: "Adventure Awaits",
        description: "Explore thrilling activities like hiking and diving.",
        image: "https://picsum.photos/id/1025/400/300",
    },
    {
        title: "Relaxation and Wellness",
        description: "Unwind in serene environments and wellness retreats.",
        image: "https://picsum.photos/id/1031/400/300",
    },
    {
        title: "Gastronomic Journeys",
        description: "Savor delicious local cuisines and culinary tours.",
        image: "https://picsum.photos/id/1011/400/300",
    },
];

const FeatureCard = () => {
    return (
        <div className="py-16 bg-gradient-to-r from-green-50 to-green-200">
            <div className="max-w-8xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Explore Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                            <img 
                                src={feature.image} 
                                alt={feature.title} 
                                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-green-700">{feature.title}</h3>
                                <p className="text-gray-600 mb-4">{feature.description}</p>
                            </div>
                            <div className="p-4 bg-green-100">
                                <button className="w-full bg-green-600 text-white font-semibold py-2 rounded-md shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;
