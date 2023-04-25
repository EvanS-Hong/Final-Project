import { useState, useEffect } from 'react';
import './AppAccordian.css'

export default function AppAccordion() {
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [locations, setLocations] = useState([]);
  const list = [
    { id: 1, name: "Japan" }
  ]

  function handleStatus(spot) {
    index === spot ? setIndex(0) : setIndex(spot);
  }
function handleStatus2(spot) {
  index2 === spot ? setIndex2(0) : setIndex2(spot);
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
      <AccordianMechanics spot2={index2} spot={index} customOnClick={handleStatus} CC2={handleStatus2} list={list} locations={locations} />
    </>
  )
}

export function AccordianMechanics({ list, customOnClick, spot, CC2, spot2, locations }) {


  const listRegions = locations.map(locations =>
    <li key={locations.LocationID}>
      <button onclick={() => CC2(locations.LocationID)}> {locations.Name} </button>
    </li> )


  const listItems = list.map(list =>
    <li key={list.id}>
      <button onClick={() => customOnClick(list.id)}> Saved Locations </button>
      {list.id === spot ? (
        <ul>
          <button onClick={() => CC2(locations.locationID)}> Japan </button>
          {locations.locationID === spot2 ? (
            <ul> {listRegions} </ul>
          ): undefined }
        </ ul>
      ) : undefined}
    </li>)

  return (
    <>
      <div className='box'>
        <ul> {listItems} </ul>
      </div>
    </>
  )

}
