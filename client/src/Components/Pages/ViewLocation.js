import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './ViewLocation.css';
import Geocode from "react-geocode";


export default function ViewLocation() {
  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();
  // const [location, setlocation] = useState(undefined);


  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (location === undefined) {
  //     setLatitude();
  //     setLongitute();
  // }



  Geocode.setApiKey("");

    const containerStyle = {
      width: '70vw',
      height: '70vh'
    };

    const center = {
      lat: -3.745,
      lng: -38.523
    };

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: ""
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    return isLoaded ? (
      <>
        {/* <form onSubmit={handleSubmit}>
          <h1> {text} </h1>
          <h1> {statusMessage} </h1>
          <label>
            username
            <input
              name="userName"
              type="userName"
              value={userName}
              onChange={e => setUserName(e.target.value)} />
          </label>
        </form> */}
        <div className="map">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker
              position={center}
            />
            { /* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </div>
      </>
    ) : <></>
  }
