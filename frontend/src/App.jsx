// src/App.jsx

import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar'; // Import Navbar as default
import SliderTab from './Components/SliderTab/SliderTab';
import Footer from './Components/Footer/Footer';
import Intro from './Components/Intro/Intro';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <br />
      <Intro />
      <SliderTab />
      <br />
      <Footer />
    </div>
  );
}

export default App;
