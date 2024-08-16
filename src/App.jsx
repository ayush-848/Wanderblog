import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar'; // Import Navbar as default
import SliderTab from './Components/SliderTab/SliderTab';
import Footer from './Components/Footer/footer';
import Intro from './Components/Intro/Intro';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Hero/>
      <br></br>
      
      <Intro />

      <SliderTab />
      <br></br>
      
      <Footer />
    </div>
  );
}

export default App;