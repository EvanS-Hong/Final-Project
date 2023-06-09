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
      <AccordianMechanics regions={regions} spot={index} spot2={index2} spot3={index3} customOnClick={handleStatus} CC2={handleStatus2} CC3={handleStatus3} list={list} locations={locations} />
    </>
  )
}

export function AccordianMechanics({ list, customOnClick, spot, CC2, spot2, spot3, locations, CC3, regions }) {

 function saveData() {
   localStorage.setItem('location', JSON.stringify(locations));
 }

  const listRegions = regions.map(regions =>
    <li key={regions.id} >
      <ul>
        <button onClick={() => CC3(regions.id)}> {regions.name} </button>
        {regions.id === spot3 ? (
          <ul>
            {locations.map(locations => {
              return locations.Region === regions.name ? (
                <li key={locations.LocationID}>
                  <Link className='link' onClick={() => saveData()} to="/SavedLocation" > {locations.Name} </Link>
                </li>
              ) : undefined
            })}
          </ul>
        ) : undefined}
      </ul>
    </li>)


  const listItems = list.map(list =>
    <li key={list.id}>
      <button onClick={() => customOnClick(list.id)}> Saved Locations </button>
      {list.id === spot ? (
        <ul>
          <button onClick={() => CC2(locations.locationID)}> Japan </button>
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
