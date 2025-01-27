import { useState, useEffect } from 'react';
import { FaSun, FaSnowflake, FaLeaf, FaTree } from 'react-icons/fa';

const SeasonalTravelTimeline = () => {
  const [activeSeason, setActiveSeason] = useState('spring');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('seasonal-travel');
      const sectionPosition = section.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (sectionPosition < viewportHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const seasons = [
    {
        name: 'spring',
        icon: FaLeaf,
        color: 'text-green-500',
        bgColor: 'bg-green-100',
      },
    
    {
      name: 'summer',
      icon: FaSun,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
    },
    {
      name: 'autumn',
      icon: FaTree,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
    {
      name: 'winter',
      icon: FaSnowflake,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
  ];

  const destinations = {
    spring: [
      {
        name: 'Kyoto, Japan',
        description: 'Experience breathtaking cherry blossoms in full bloom.',
        bestTime: 'March to May',
        averageTemp: '10°C - 20°C (50°F - 68°F)',
        activities: ['Hanami (flower viewing)', 'Cultural festivals', 'Tea ceremonies'],
        image: 'https://picsum.photos/id/1005/400/300',
        bgColor: 'bg-green-500',
        color: 'text-green-500'
      },
      {
        name: 'Amsterdam, Netherlands',
        description: 'Enjoy the beautiful tulip fields and vibrant canals.',
        bestTime: 'April to May',
        averageTemp: '6°C - 15°C (43°F - 59°F)',
        activities: ['Tulip viewing', 'Canal cruises', 'Cycling tours'],
        image: 'https://picsum.photos/id/1015/400/300',
        bgColor: 'bg-green-500',
        color: 'text-green-500'
      },
      {
        name: 'Washington D.C., USA',
        description: 'Marvel at the iconic cherry blossoms around the Tidal Basin.',
        bestTime: 'March to April',
        averageTemp: '8°C - 20°C (46°F - 68°F)',
        activities: ['Cherry blossom festival', 'Historical tours', 'Picnicking'],
        image: 'https://picsum.photos/id/1043/400/300',
        bgColor: 'bg-green-500',
        color: 'text-green-500'
      },
    ],
    summer: [
      {
        name: 'Bali, Indonesia',
        description: 'Relax on stunning beaches and explore lush rice terraces.',
        bestTime: 'May to September',
        averageTemp: '24°C - 32°C (75°F - 90°F)',
        activities: ['Surfing', 'Yoga retreats', 'Beach hopping'],
        image: 'https://picsum.photos/id/1030/400/300',
        bgColor: 'bg-yellow-500',
        color: 'text-yellow-500'
      },
      {
        name: 'Santorini, Greece',
        description: 'Experience stunning sunsets and white-washed buildings.',
        bestTime: 'June to September',
        averageTemp: '23°C - 30°C (73°F - 86°F)',
        activities: ['Wine tasting', 'Beach activities', 'Sightseeing'],
        image: 'https://picsum.photos/id/1011/400/300',
        bgColor: 'bg-yellow-500',
        color: 'text-yellow-500'
      },
      {
        name: 'Maui, Hawaii, USA',
        description: 'Discover beautiful beaches and lush landscapes.',
        bestTime: 'April to October',
        averageTemp: '22°C - 30°C (72°F - 86°F)',
        activities: ['Snorkeling', 'Hiking', 'Surfing'],
        image: 'https://picsum.photos/id/1050/400/300',
        bgColor: 'bg-yellow-500',
        color: 'text-yellow-500'
      },
    ],
    autumn: [
      {
        name: 'New England, USA',
        description: 'Experience breathtaking fall foliage and charming towns.',
        bestTime: 'September to October',
        averageTemp: '5°C - 15°C (41°F - 59°F)',
        activities: ['Leaf peeping', 'Hiking', 'Apple picking'],
        image: 'https://picsum.photos/id/1036/400/300',
        bgColor: 'bg-orange-500',
        color: 'text-orange-500'
      },
      {
        name: 'Tokyo, Japan',
        description: 'Enjoy stunning autumn colors and cultural festivals.',
        bestTime: 'November to December',
        averageTemp: '10°C - 18°C (50°F - 64°F)',
        activities: ['Koyo (autumn leaf viewing)', 'Food festivals', 'Temple visits'],
        image: 'https://picsum.photos/id/1023/400/300',
        bgColor: 'bg-orange-500',
        color: 'text-orange-500'
      },
      {
        name: 'Provence, France',
        description: 'Experience harvest season and beautiful landscapes.',
        bestTime: 'September to October',
        averageTemp: '10°C - 20°C (50°F - 68°F)',
        activities: ['Wine tasting', 'Lavender harvesting', 'Cycling tours'],
        image: 'https://picsum.photos/id/1000/400/300',
        bgColor: 'bg-orange-500',
        color: 'text-orange-500'
      },
    ],
    winter: [
      {
        name: 'Zermatt, Switzerland',
        description: 'Enjoy skiing in the picturesque Swiss Alps.',
        bestTime: 'December to March',
        averageTemp: '-2°C - 5°C (28°F - 41°F)',
        activities: ['Skiing', 'Snowboarding', 'Winter hiking'],
        image: 'https://picsum.photos/id/1027/400/300',
        bgColor: 'bg-blue-500',
        color: 'text-blue-500'
      },
      {
        name: 'Lapland, Finland',
        description: 'Experience the magical Northern Lights and winter activities.',
        bestTime: 'November to March',
        averageTemp: '-15°C - -5°C (5°F - 23°F)',
        activities: ['Dog sledding', 'Ice fishing', 'Husky safaris'],
        image: 'https://picsum.photos/id/1053/400/300',
        bgColor: 'bg-blue-500',
         color: 'text-blue-500'
      },
      {
        name: 'Reykjavik, Iceland',
        description: 'Explore stunning ice caves and geothermal hot springs.',
        bestTime: 'December to February',
        averageTemp: '-5°C - 5°C (23°F - 41°F)',
        activities: ['Ice caving', 'Geothermal bathing', 'Northern Lights tours'],
        image: 'https://picsum.photos/id/1044/400/300',
        bgColor: 'bg-blue-500',
         color: 'text-blue-500'
      },
    ],
  };  

  return (
    <div 
      id="seasonal-travel" 
      className={`py-16 px-4 md:px-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} bg-gradient-to-r from-green-50 to-green-200`}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-teal-800">Seasonal Escapes</h2>
      <div className="flex justify-center space-x-6 mb-10">
        {seasons.map((season) => {
          const Icon = season.icon;
          return (
            <button
              key={season.name}
              className={`w-20 h-20 flex flex-col items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 ${
                activeSeason === season.name 
                  ? `${season.bgColor} ${season.color} shadow-lg ring-2 ring-teal-500` 
                  : 'bg-white text-teal-800 hover:shadow-md'
              }`}
              onClick={() => setActiveSeason(season.name)}
            >
              <Icon className={`text-2xl`} />
              <span className="mt-1 text-xs capitalize font-medium">{season.name}</span>
            </button>
          );
        })}
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations[activeSeason].map((destination) => (
          <div key={destination.name} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-200">
            <div className="relative h-48">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white text-center">{destination.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-lg text-gray-700 mb-2">{destination.description}</p>
              <div className="text-base text-gray-600">
                <p><strong>Best Time:</strong> <span className={`${destination.color}`}>{destination.bestTime}</span></p>
                <p><strong>Avg Temp:</strong> <span className={`${destination.color}`}>{destination.averageTemp}</span></p>
                <p><strong>Activities:</strong> <span className={`${destination.color}`}>{destination.activities.join(', ')}</span></p>
              </div>
              <button className={`mt-4 ${destination.bgColor} hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300`}>
                Explore More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default SeasonalTravelTimeline;
