import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude (San Francisco)
};

const MapComponent = () => {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(defaultCenter);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Get user's current location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            setUserLocation(defaultCenter);
          }
        );
      } else {
        console.error("Geolocation not supported");
        setUserLocation(defaultCenter);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/maps/places", {
          params: {
            lat: userLocation.lat,
            lng: userLocation.lng,
          },
        });

        if (response.data) {
          console.log(response.data);
          setPlaces(response.data);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    if (userLocation.lat !== defaultCenter.lat && userLocation.lng !== defaultCenter.lng) {
      fetchPlaces();
    }
  }, [userLocation]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Map Section */}
      <div className="flex-1 shadow-lg rounded-xl overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={15}
          className="w-full h-full"
        >
          {places.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
              }}
              title={place.name}
              onClick={() => setSelectedPlace(place)}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Selected Place Details */}
      {selectedPlace && (
        <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-xl">
          <h2 className="text-lg font-semibold">{selectedPlace.name}</h2>
          <p className="text-gray-600">{selectedPlace.vicinity}</p>
          <p className="text-gray-800 mt-2">Rating: ⭐ {selectedPlace.rating || "N/A"}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setSelectedPlace(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MapComponent;




