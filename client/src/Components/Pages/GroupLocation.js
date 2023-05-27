import { useEffect, useState, useMemo } from 'react'
import React from 'react';
import { GoogleMap, MarkerF, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import './ViewLocation.css';
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';


export default function GroupLocation() {
  const [location, setLocation] = useState({ lat: 35.6761919, lng: 139.6503106 });
  const libraries = useMemo(() => ['places'], []);



  useEffect(() => {
    async function displayLocation(address) {
      try {
        const results = await getGeocode({ address });
        if (!results.ok) {
          throw new Error(`error ${results.status}`);
        }
        const { lat, lng } = await getLatLng(results[0]);
        setLocation({ lat, lng });
      } catch (err) {
        console.error('Error!:', err);
      }
    }
  }, []);

  useEffect(() => {
    const coors = (JSON.parse(localStorage.getItem('coordinates')));
    setLocation(coors);
    function saveCoors() {
      const coors = (JSON.parse(localStorage.getItem('coordinates')));
      setLocation(coors);
    }
    const autoSave = setInterval(saveCoors, 300000)
    return () => {
      clearInterval(autoSave);
    }
  },[]);


  const containerStyle = {
    width: '70vw',
    height: '70vh'
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAA9yzP9GJ7dLzvbAD5ybpzCm1ImSy4TqA",
    libraries
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <>
      <div className="viewcontainer">
        <div className="map">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <MarkerF position={location} />
            {/* Use MarkerF for react. Marker doesn't show} */}
          </GoogleMap>
        </div>
      </div>
    </>
  ) : <></>
}