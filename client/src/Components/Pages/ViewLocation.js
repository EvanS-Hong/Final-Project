import { useEffect, useState, useMemo } from 'react'
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './ViewLocation.css';
import usePlacesAutoComplete, {getGeocode, getLatLng } from 'use-places-autocomplete';


export default function ViewLocation() {
  const [location, setLocation] = useState('');
  const libraries = useMemo(() => ['places'], []);

  useEffect(() => {
    async function displayLocation(address) {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setLocation({ lat, lng});
        console.log(location);
      } catch(err) {
        console.error('Error!:', err);
      }
    }
  }, [location]);

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
      <div className="container">
        <PlacesAutoComplete onSelect={(latLng, address) =>  setLocation(latLng)} />
        <div className="map">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={location}/>
            { /* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        </div>
      </div>
      </>
    ) : <></>
}


  const PlacesAutoComplete = ({ onSelect }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions
    } = usePlacesAutoComplete();

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    const handleSelect =
      ({ description }) =>
        () => {
          setValue(description, false);
          clearSuggestions();

          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            onSelect({ lat, lng });
          });
        };

   return (
      <div className="selectBox" onSelect={handleSelect}>
        <input
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Tokyo Japan" />
          {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
  );
}
