// App.jsx

import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar'; // Import Navbar as default
import SliderTab from './Components/SliderTab/SliderTab';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero/>
      <br></br>
      <SliderTab />
      <br></br>
    </div>
  );
}

export default App;
