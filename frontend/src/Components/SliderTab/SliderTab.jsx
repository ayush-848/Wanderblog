import React, { useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

// Import images
import France from '../../assets/France.jpg';
import Indonesia from '../../assets/Indonesia.jpg';
import Egypt from '../../assets/Egypt.jpeg';
import Japan from '../../assets/Japan.jpg';
import Singapore from '../../assets/Singapore.jpg';
import Spain from '../../assets/Spain.jpg';
import Srilanka from '../../assets/SriLanka.jpg';
import Turkey from '../../assets/Turkey.jpg';

const imagesAndTexts = [
    { image: France, title: "Explore France", description: "Experience the elegance of Paris.", background: France },
    { image: Indonesia, title: "Discover Indonesia", description: "A paradise for nature lovers.", background: Indonesia },
    { image: Egypt, title: "Visit Egypt", description: "Home of the ancient pyramids.", background: Egypt },
    { image: Japan, title: "Discover Japan", description: "A blend of tradition and innovation.", background: Japan },
    { image: Singapore, title: "Explore Singapore", description: "A city of the future.", background: Singapore },
    { image: Spain, title: "Visit Spain", description: "Rich in history and culture.", background: Spain },
    { image: Srilanka, title: "Experience Srilanka", description: "Beautiful beaches and ancient ruins.", background: Srilanka },
    { image: Turkey, title: "Discover Turkey", description: "Where east meets west.", background: Turkey },
];

const SliderTab = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesAndTexts.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? imagesAndTexts.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-[60vh] overflow-hidden rounded-lg shadow-lg">
            {/* Slide Container */}
            <div className="absolute inset-0 bg-cover bg-center filter brightness-50" style={{ backgroundImage: `url(${imagesAndTexts[currentIndex].background})` }} />

            {/* Slide Content */}
            <div className="relative flex flex-col items-center justify-center h-full text-white z-10 p-6">
                <img
                    src={imagesAndTexts[currentIndex].image}
                    alt={`Slide ${currentIndex + 1}`}
                    className="rounded-md shadow-md mb-4 max-w-full max-h-[30vh] object-cover"
                />
                <h3 className="text-3xl font-semibold text-center">{imagesAndTexts[currentIndex].title}</h3>
                <p className="mt-2 text-lg text-center max-w-md">{imagesAndTexts[currentIndex].description}</p>
            </div>

            {/* Navigation Arrows */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-40 rounded-full p-3 transition duration-300 hover:bg-opacity-60" onClick={goToPrevSlide}>
                <FaCaretLeft className="text-white text-xl" />
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-40 rounded-full p-3 transition duration-300 hover:bg-opacity-60" onClick={goToNextSlide}>
                <FaCaretRight className="text-white text-xl" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {imagesAndTexts.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition duration-300 ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SliderTab;
