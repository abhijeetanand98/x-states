// import React from 'react';
// import LocationSelector from './LocationSelector';

// function App() {
//     return (
//         <div className="App">
//             <LocationSelector />
//         </div>
//     );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch all countries on component mount
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      } else {
        console.error('Failed to fetch countries data');
      }
    } catch (error) {
      console.error('Error fetching countries data:', error);
    }
  };

  const fetchStates = async (countryName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      if (response.ok) {
        const data = await response.json();
        setStates(data);
      } else {
        console.error('Failed to fetch states data');
      }
    } catch (error) {
      console.error('Error fetching states data:', error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      if (response.ok) {
        const data = await response.json();
        setCities(data);
      } else {
        console.error('Failed to fetch cities data');
      }
    } catch (error) {
      console.error('Error fetching cities data:', error);
    }
  };

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    fetchStates(countryName);
  };

  const handleStateChange = (event) => {
    const stateName = event.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    fetchCities(selectedCountry, stateName);
  };

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
  };

  return (
    <div className="location-selector-container">
      <div className="input-group">
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="state">Select State:</label>
        <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="city">Select City:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Display selected city, state, and country */}
      {selectedCity && selectedState && selectedCountry && (
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
}

export default App;
