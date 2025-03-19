import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mapInstance, setMapInstance] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
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

  // Resizes the map when the panel opens/closes
  useEffect(() => {
    if (mapInstance) {
      setTimeout(() => {
        window.google.maps.event.trigger(mapInstance, "resize");
      }, 300); // Delay to ensure smooth resizing
    }
  }, [selectedPlace, mapInstance]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Animated Map Section */}
      <motion.div
        className="shadow-lg rounded-xl overflow-hidden flex-grow"
        initial={{ flex: 1 }}
        animate={{ flex: selectedPlace ? 0.7 : 1 }} // Smooth resizing
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={15}
          onLoad={(map) => {
            setMapInstance(map);
            mapRef.current = map;
          }}
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
      </motion.div>

      {/* Selected Place Details with Animation */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="p-4 bg-white shadow-lg rounded-xl flex flex-col"
            style={{ flex: 0.3 }}
          >
            <h2 className="text-lg font-semibold">{selectedPlace.name}</h2>
            <p className="text-gray-600">{selectedPlace.vicinity}</p>
            <p className="text-gray-800 mt-2">Rating: ⭐ {selectedPlace.rating || "N/A"}</p>

            {/* View on Google Maps Button */}
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${selectedPlace.place_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-center"
            >
              View on Google Maps
            </a>

            <motion.button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setSelectedPlace(null)}
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapComponent;










