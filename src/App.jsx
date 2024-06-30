// App.jsx

import Hero from './Components/Hero/Hero';
import Navbar from './Components/Navbar/Navbar'; // Import Navbar as default
import DashBoard from './Components/DashBoard/DashBoard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero/>
      <DashBoard/>
    </div>
  );
}

export default App;
