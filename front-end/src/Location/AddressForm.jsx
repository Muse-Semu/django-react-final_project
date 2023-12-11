import React, { useEffect, useState } from "react";
import axios from 'axios'
const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [isInRange, setIsInRange] = useState(false);

  // const endpoint= 'https://api.openweathermap.org/data/2.5/weather?'
  // const apiKey = '5851e44f77c870cbea887bf3404dc500'

  const specifiedLatitude = 12; // Latitude of the specified location
  const specifiedLongitude = 37.006; // Longitude of the specified location
  const rangeInKilometers = 30; // Range in kilometers

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log(
              `https://www.google.pt/maps/@${position.coords.latitude},${position.coords.longitude}`
            );
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        specifiedLatitude,
        specifiedLongitude
      );

      setIsInRange(distance <= rangeInKilometers);
    }
  }, [latitude, longitude]);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
     console.log(distance)
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
          <br />
          {isInRange ? (
            <p>Current location is within the specified range</p>
          ) : (
            <p>Current location is outside the specified range</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
