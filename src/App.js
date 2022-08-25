import Header from './components/Header';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import data from './data/stays.json';
import { useState } from 'react';
import './App.css';

const getLocations = (stays) => {
  // Get locations as strings "City, Country"
  const locationsList = stays.map(({ city, country }) => `${city}, ${country}`);
  // Remove duplicates
  const locations = [...new Set(locationsList)];
  return locations;
};

function App() {
  const [location, setLocation] = useState(null);
  const [guests, setGuests] = useState(0);
  const [isInactive, setIsInactive] = useState(false);

  const locations = getLocations(data);
  const country = location?.split(', ')[1];
  const stays = data.filter(
    (stay) =>
      (location ? `${stay.city}, ${stay.country}` === location : true) &&
      stay.maxGuests >= guests
  );

  return (
    <div className='app'>
      <Header
        locations={locations}
        setLocation={setLocation}
        setGuests={setGuests}
        setIsInactive={setIsInactive}
      />
      <Gallery stays={stays} country={country} isInactive={isInactive} />
      <Footer isInactive={isInactive} />
    </div>
  );
}

export default App;
