import { useState, useEffect, useMemo,} from 'react';
import React from 'react';
import './AddLocation.css';
import './SavedLocation.css';
import { GoogleMap, MarkerF, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete';


export default function SavedLocation() {
  const [coordinates, setCoordinates] = useState('');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('Japan');
  const [locationID, setlocationID] = useState(0);
  const { lat, lng } = coordinates;
  let savedLocation = (JSON.parse(localStorage.getItem('location')))

  useEffect(() => {
    setCoordinates({lat: +savedLocation.Latitude, lng: +savedLocation.Longitude});
    setLocationName(savedLocation.Name);
    setDescription(savedLocation.Description);
    setRegion(savedLocation.Region);
    setCountry(savedLocation.Country);
    setlocationID(savedLocation.LocationID);
    window.addEventListener('beforeunload', (() => {
      localStorage.removeItem('route')
    }))
  },[]);

  function handleSubmit(e) {
    e.preventDefault();
    const location = {
      lat,
      lng,
      locationName,
      description,
      country,
      region,
      locationID,
    };
    EditLocation(location);
  }

  async function EditLocation(newLocation) {
    console.log(newLocation);
    try {
      const res = await fetch('/api/Locations/edit-location', {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLocation),
      })
      if (!res.ok) {
        throw new Error(`error ${res.status}`);
      }
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>
      <div className="form-Container">
        <form onSubmit={handleSubmit}>
          <div className="name-region">
            <label>
              Location name
              <input
                name="locationName"
                type="text"
                value={locationName}
                onChange={e => setLocationName(e.target.value)} />
            </label>
            <label className="region">
              Region
              <select name="regions"
                defaultValue={region}
                onChange={e => setRegion(e.target.value)}>
                <option value="Tohoku">Tohoku </option>
                <option value="Kanto">Kanto </option>
                <option value="Chubu">Chubu </option>
                <option value="Kansai">Kansai </option>
                <option value="ChuGoku">ChuGoku </option>
              </select>
            </label>
            <label className="Country">
              Country
              <select name="Country"
                onChange={e => setCountry(e.target.value)}>
                <option value="Japan">Japan </option>
              </select>
            </label>
          </div>
          <ViewLocation />
          <label>
            Description
            <textarea
              rows="9"
              columns="8"
              className="description"
              name="Description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)} />
          </label>
          <button className="form-submit" type="submit"> Edit Location </button>
        </form>
      </div>
    </>
  )
}

 function ViewLocation() {
  const savedLocation = (JSON.parse(localStorage.getItem('location')))
  const [location, setLocation] = useState({ lat: +savedLocation.Latitude, lng: +savedLocation.Longitude });

const libraries = useMemo(() => ['places'], []);
  const containerStyle = {
    width: '70vw',
    height: '70vh'
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAHFRZ7n1y4ngh9aS4kj2HpOzEzjOBBUjg",
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
        <PlacesAutoComplete onSelect={(latLng, address) => setLocation(latLng)} />
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
        placeholder="Search Location" />
      {status === "OK" && <ul className="list">{renderSuggestions()}</ul>}
    </div>
  );
}
