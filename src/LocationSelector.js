import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationSelector.css';

const LocationSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch all countries on component mount
        axios.get('https://crio-location-selector.onrender.com/countries')
            .then(response => setCountries(response.data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            // Fetch states when a country is selected
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then(response => setStates(response.data))
                .catch(error => console.error('Error fetching states:', error));
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            // Fetch cities when a state is selected
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then(response => setCities(response.data))
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [selectedState]);

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setSelectedCity('');
        setStates([]);
        setCities([]);
        setMessage('');
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
        setCities([]);
        setMessage('');
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setMessage(`You Selected ${e.target.value}, ${selectedState}, ${selectedCountry}`);
    };

    return (
        <div className="location-selector">
            <div>
                <label htmlFor="country">Select Country</label>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="state">Select State</label>
                <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="city">Select City</label>
                <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LocationSelector;
