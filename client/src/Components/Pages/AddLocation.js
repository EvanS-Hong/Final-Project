import { useState, useEffect } from 'react';
import ViewLocation from './ViewLocation';
import './ViewLocation.css';

export default function AddLocation() {
  const [coordinates, setCoordinates] = useState('');

//  const changeCoordinates = (


  return (
    <>
      <ViewLocation cc={(location) => setCoordinates(location)}/>
  </>
  )
}
