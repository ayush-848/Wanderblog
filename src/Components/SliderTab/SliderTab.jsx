import React, { useState } from 'react';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import styles from './SliderTab.module.css';

const imagesAndTexts = [
    {
        image: 'src/assets/France.jpg',
        title: 'Discover France: A Symphony of Elegance and Heritage',
        description: 'Welcome to France, a country celebrated for its sophistication and charm. Stroll through Paris, the City of Lights, and admire the iconic Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Explore the picturesque villages of Provence, the scenic vineyards of Bordeaux, and the glamorous French Riviera. Immerse yourself in rich history at castles like Château de Chambord and indulge in world-renowned cuisine and wine. From the stunning landscapes of the Alps to the artistic ambiance of Montmartre, France offers a perfect blend of culture, beauty, and culinary delights. An enchanting journey awaits in this timeless destination.',
        background: 'src/assets/France.jpg'
    },
    {
        image: 'src/assets/Indonesia.jpg',
        title: 'Explore Indonesia: A Tropical Paradise of Diversity',
        description: "Welcome to Indonesia, a stunning archipelago of over 17,000 islands, each offering its own unique charm. Discover Bali's lush landscapes and vibrant culture, or explore the ancient temples of Yogyakarta. Dive into the crystal-clear waters of Raja Ampat and witness some of the world's best marine life. Experience the bustling streets of Jakarta, the serene beauty of Ubud, and the stunning volcanic scenery of Mount Bromo. With its rich cultural heritage, diverse ecosystems, and warm hospitality, Indonesia promises an unforgettable adventure through its tropical paradise.",
        background: 'src/assets/Indonesia.jpg'
    },
    {
        image: 'src/assets/Egypt.jpeg',
        title: 'Discover Egypt: A Land of Timeless Wonders',
        description: "Welcome to Egypt, a land of ancient wonders and vibrant culture.Explore the majestic Pyramids of Giza and the enigmatic Sphinx, marvel at Luxor's grand temples, and uncover the treasures of Tutankhamun in Cairo. Enjoy the Mediterranean charm of Alexandria and dive into the crystal-clear waters of the Red Sea. Experience the serene beauty of the Sahara Desert and indulge in delicious local cuisine. With its rich history, stunning landscapes, and warm hospitality, Egypt offers an unforgettable adventure through time and tradition.",
        background: 'src/assets/Egypt.jpeg'
    },
    {
        image: 'src/assets/Japan.jpg',
        title: 'Experience Japan: A Blend of Tradition and Innovation',
        description: "Welcome to Japan, a land where ancient traditions and cutting-edge technology harmoniously coexist. Explore Tokyo's bustling streets, high-tech marvels, and vibrant districts like Shibuya and Akihabara. Discover Kyoto’s serene temples, beautiful gardens, and traditional tea houses. Witness the majestic Mount Fuji and relax in the natural hot springs of Hakone. Dive into Japan’s rich cultural heritage with sumo wrestling, traditional festivals, and exquisite cuisine, including sushi and ramen. With its unique blend of historical charm and modern flair, Japan offers a captivating journey that will leave you enchanted and inspired.",
        background: 'src/assets/Japan.jpg'
    },
    {
        image: 'src/assets/Singapore.jpg',
        title: 'Discover Singapore: A Modern Oasis of Diversity',
        description: "Welcome to Singapore, a dynamic city-state where sleek modernity meets rich cultural heritage. Wander through the stunning Gardens by the Bay, marvel at the iconic Marina Bay Sands, and explore the vibrant neighborhoods of Chinatown, Little India, and Orchard Road. Enjoy world-class dining, shopping, and the bustling nightlife of Clarke Quay. Relax in lush green spaces like Sentosa Island and the Singapore Botanic Gardens. With its efficient public transport, diverse culture, and innovative skyline, Singapore offers a vibrant and exciting experience, seamlessly blending tradition with futuristic charm.",
        background: 'src/assets/Singapore.jpg'
    },
    {
        image: 'src/assets/Spain.jpg',
        title: 'Explore Spain: A Celebration of Culture and Passion',
        description: "Welcome to Spain, a vibrant country known for its lively spirit and diverse landscapes. Wander through the historic streets of Barcelona and marvel at Gaudí’s masterpieces like the Sagrada Família. Experience the artistic heritage of Madrid, with its renowned museums and bustling plazas. Immerse yourself in the rich traditions of Seville, from flamenco dancing to grand festivals. Relax on the sunny beaches of Costa del Sol or the Balearic Islands. Indulge in delicious tapas and savor the flavors of Spanish cuisine. With its captivating history, passionate culture, and scenic beauty, Spain offers an unforgettable adventure.",
        background: 'src/assets/Spain.jpg'
    },
    {
        image: 'src/assets/Srilanka.png',
        title: 'Discover Sri Lanka: A Jewel of Natural Beauty and Culture',
        description: "Welcome to Sri Lanka, an island paradise renowned for its stunning landscapes and rich cultural heritage. Explore the ancient cities of Anuradhapura and Polonnaruwa, and marvel at the iconic Sigiriya Rock Fortress. Relax on pristine beaches like Mirissa and Unawatuna, or embark on a scenic train journey through lush tea plantations in Ella. Experience the vibrant wildlife in Yala National Park and savor the diverse flavors of Sri Lankan cuisine. With its enchanting temples, serene landscapes, and warm hospitality, Sri Lanka promises a captivating and memorable journey.",
        background: 'src/assets/Srilanka.png'
    },
    {
        image: 'src/assets/Turkey.jpg',
        title: 'Experience Turkey: A Crossroads of History and Natural Beauty',
        description: "Welcome to Turkey, a land where East meets West in a tapestry of history and culture. Explore Istanbul’s majestic landmarks, including the Hagia Sophia and the Blue Mosque, and stroll through the vibrant bazaars of the Grand Bazaar. Discover the ancient ruins of Ephesus and the stunning landscapes of Cappadocia, with its unique rock formations and hot air balloon rides. Relax on the turquoise beaches of Antalya and Pamukkale’s natural thermal pools. With its rich historical legacy, diverse landscapes, and delicious cuisine, Turkey offers a captivating journey through a land of timeless allure.",
        background: 'src/assets/Turkey.jpg'
    },
    // Add more objects as needed
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
        <div className={styles.slider}>
            <div 
                className={styles.blurWrapper}
                style={{ backgroundImage: `url(${imagesAndTexts[currentIndex].background})` }}
            />
            <div className={styles.slide}>
                <img
                    src={imagesAndTexts[currentIndex].image}
                    alt={`Slide ${currentIndex + 1}`}
                />
                <div className={styles.text}>
                    <h3>{imagesAndTexts[currentIndex].title}</h3>
                    <p>{imagesAndTexts[currentIndex].description}</p>
                </div>
            </div>

            <button className={styles.prevArrow} onClick={goToPrevSlide}>
                <FaCaretLeft className={styles.arrowIcon} />
            </button>
            <button className={styles.nextArrow} onClick={goToNextSlide}>
                <FaCaretRight className={styles.arrowIcon} />
            </button>

            <div className={styles.dots}>
                {imagesAndTexts.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default SliderTab;
