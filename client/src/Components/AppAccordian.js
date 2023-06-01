import { useState, useEffect } from 'react';
import './AppAccordian.css'
import { Link, Outlet } from "react-router-dom";

export default function AppAccordion() {
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [locations, setLocations] = useState([]);

  const list = [
    { id: 1, name: "Japan" }
  ]

  const regions = [
    { id: 1, name: "Tohoku" },
    { id: 2, name: "Kanto" },
    { id: 3, name: "Chubu" },
    { id: 4, name: "Kansai" },
    { id: 5, name: "ChuGoku" }
  ]

  function handleStatus(spot) {
    index === spot ? setIndex(0) : setIndex(spot);
  }

  function handleStatus2(spot) {
    index2 === spot ? setIndex2(0) : setIndex2(spot);
  }

  function handleStatus3(spot) {
    index3 === spot ? setIndex3(0) : setIndex3(spot);
  }

  useEffect(() => {
    async function getLocations() {
      try {
        const res = await fetch('/api/Locations');
        if (!res.ok) {
          throw new Error(`error ${res.status}`);
        } else {
          const jsonData = await res.json();
          setLocations(jsonData);;
        }
      } catch (err) {
        console.error(err);
      }
    }
    getLocations();
  }, []);

  return (
    <>
      <AccordianMechanics regions={regions} spot={index} spot2={index2} spot3={index3} onSavedLocationsClick={handleStatus} onRegionClick={handleStatus2} OnBookmarkedLocation={handleStatus3} list={list} locations={locations} />
    </>
  )
}

export function AccordianMechanics({ list, onSavedLocationsClick, spot, onRegionClick, spot2, spot3, locations, OnBookmarkedLocation, regions }) {

 function saveData(data) {
   localStorage.setItem('location', JSON.stringify(data));
   const route = (JSON.parse(localStorage.getItem('route')))
   if (route == null) {
    localStorage.setItem('route', JSON.stringify(data.Name))
   } else if (route !== data.Name && route !== null) {
    window.location.reload();
   }
 }

  const listRegions = regions.map(regions =>
    <li key={regions.id} >
      <ul>
        <button className='region-button' onClick={() => OnBookmarkedLocation(regions.id)}> {regions.name} </button>
        {regions.id === spot3 ? (
          <ul>
            {locations.map(locations => {
              return locations.Region === regions.name ? (
                <li key={locations.LocationID}>
                  <Link className='link location' onClick={() => saveData(locations)} to="/SavedLocation" > {locations.Name} </Link>
                </li>
              ) : undefined
            })}
          </ul>
        ) : undefined}
      </ul>
    </li>)

  const listItems = list.map(list =>
    <li key={list.id}>
      <button onClick={() => onSavedLocationsClick(list.id)}> Saved Locations </button>
      {list.id === spot ? (
        <ul>
          <button className='country-button' onClick={() => onRegionClick(locations.locationID)}> Japan </button>
          {locations.locationID === spot2 ? (
            <ul> {listRegions} </ul>
          ) : undefined}
        </ ul>
      ) : undefined}
    </li>)

  return (
    <>
    <Outlet />
      <div className='box'>
        <ul> {listItems} </ul>
      </div>
    </>
  )

}
