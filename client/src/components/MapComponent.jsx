import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";


const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude (San Francisco)
};

const MapComponent = () => {
  const [places, setPlaces] = useState([]);
  const MAP_API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY; // Use Vite env variable

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${defaultCenter.lat},${defaultCenter.lng}`,
              radius: 5000, // 5km radius
              keyword: "volunteer donation non-profit",
              key: MAP_API_KEY,
            },
          }
        );

        if (response.data.results) {
          setPlaces(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [MAP_API_KEY]);

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY} libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={12}>
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;


