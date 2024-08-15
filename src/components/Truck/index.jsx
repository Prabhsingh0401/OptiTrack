import React, { useState, useEffect } from "react";
import axios from 'axios';
import './index.scss';
import { useUser } from '@clerk/clerk-react';
import Dashboard from '../../assets/Dashboard icon.png';

export default function TruckDashboard() {
    const { user } = useUser(); // Access user data
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    const handleRouteOptimization = () => {
        // Handle the logic for route optimization
        console.log('Optimize route from:', location, 'to:', destination);
    };

    // Function to fetch location suggestions from LocationIQ
    const fetchLocationSuggestions = async (input, setSuggestions) => {
        if (input.length > 2) {
            try {
                const response = await axios.get(`https://us1.locationiq.com/v1/autocomplete.php`, {
                    params: {
                        key: 'pk.d6276ea2538c649ef31fde1ce3b6c826', // Replace with your API key
                        q: input,
                        limit: 5
                    }
                });
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching location suggestions:', error);
            }
        } else {
            setSuggestions([]); // Clear suggestions if input is less than 3 characters
        }
    };

    // Update location suggestions as the user types with debouncing to prevent multiple triggers
    useEffect(() => {
        const timer = setTimeout(() => {
            if (location) {
                fetchLocationSuggestions(location, setLocationSuggestions);
            }
        }, 300); // Delay to prevent multiple triggers
        return () => clearTimeout(timer);
    }, [location]);

    // Update destination suggestions as the user types with debouncing to prevent multiple triggers
    useEffect(() => {
        const timer = setTimeout(() => {
            if (destination) {
                fetchLocationSuggestions(destination, setDestinationSuggestions);
            }
        }, 300); // Delay to prevent multiple triggers
        return () => clearTimeout(timer);
    }, [destination]);

    return (
        <div className="truck-index-page">
            <h1>Greetings, {user ? user.firstName : "Guest"}</h1>
            <h2 className="h2">Dashboard <img src={Dashboard} alt="Dashboard icon" /></h2>
            <p className="main-heading1">
                Designed for optimal route planning, it offers real-time updates, ensuring that drivers receive the most efficient and accurate navigation, minimizing delays and fuel consumption.
                <br /><br />
                Whether navigating through congested areas or remote highways, it provides a seamless solution for truck drivers to find the quickest and most reliable route to their destination.
            </p>
            <div className="form-container">
                <form>
                    <label>Truck Driver's Current Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter current location"
                        className="autocomplete-input"
                    />
                    {locationSuggestions.length > 0 && (
                        <ul className="autocomplete-suggestions location-suggestions">
                            {locationSuggestions.map((suggestion, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => {
                                        setLocation(suggestion.display_name);
                                        setLocationSuggestions([]); // Clear suggestions after selection
                                    }}
                                >
                                    {suggestion.display_name}
                                </li>
                            ))}
                        </ul>
                    )}

                    <label>Destination Location:</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination"
                        className="autocomplete-input"
                    />
                    {destinationSuggestions.length > 0 && (
                        <ul className="autocomplete-suggestions destination-suggestions">
                            {destinationSuggestions.map((suggestion, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => {
                                        setDestination(suggestion.display_name);
                                        setDestinationSuggestions([]); // Clear suggestions after selection
                                    }}
                                >
                                    {suggestion.display_name}
                                </li>
                            ))}
                        </ul>
                    )}

                    <button type="button" onClick={handleRouteOptimization}>Get Optimized Route</button>
                </form>
            </div>
        </div>
    );
}
