// App.jsx

import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar'; // Import Navbar as default
import SliderTab from './Components/SliderTab/SliderTab';
import Footer from './Components/footer/footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero/>
      <br></br>
      <SliderTab />
      <br></br>
      <Footer />
    </div>
  );
}

export default App;
