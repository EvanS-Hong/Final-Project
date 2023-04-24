import { useEffect, useState, React } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './ViewLocation.css';
import usePlacesAutoComplete, {getGeocode, getLatLng } from 'use-places-autocomplete';


export default function ViewLocation() {
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState();
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    async function displayLocation(address) {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setLocation({ lat, lng});
        setLatitude(lat);
        setLongitude(lng);
      } catch(err) {
        console.error('Error!:', err);
      }
    }
  }, []);

    const containerStyle = {
      width: '70vw',
      height: '70vh'
    };

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAA9yzP9GJ7dLzvbAD5ybpzCm1ImSy4TqA"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(location);
      map.fitBounds(bounds);

      setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    return isLoaded ? (
      <>
        <PlacesAutoComplete onSelect={(latLng, address) =>  setLocation(latLng)} />
        <div className="map">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={location}
            />
            { /* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
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


  const handleSelect = async address => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({ lat, lng }, address);
    } catch (err) {
      console.error('Error:', err);
    }
  }

   return (
      <form onSelect={handleSelect}>
        <input
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        placeholder="placehere" />
      </form>
  );
}
