import './App.css';
import AppDrawer from './Components/AppDrawers';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import ViewLocation from './Components/Pages/ViewLocation';
import AddLocation from './Components/Pages/AddLocation';
import SavedLocation from './Components/Pages/SavedLocation';
import GroupLocation from './Components/Pages/GroupLocation';


function App() {
   const [currentCoordinates, setCurrentCoordinates] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem('coordinates', JSON.stringify({lat: +position.coords.latitude, lng: +position.coords.longitude}));
    });
  }, []);


  return (
    <>
      <AppDrawer />
      <Routes>
        <Route path="ViewLocation" element={<ViewLocation />} />
        <Route path="AddLocation" element={<AddLocation />} />
        <Route path="SavedLocation" element={<SavedLocation /> } />
        <Route path="GroupLocation" element={<GroupLocation /> } />
      </Routes>

    </>
  );
  }

export default App;
