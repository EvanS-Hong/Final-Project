import './App.css';
import { useState, useEffect } from 'react';
import AppDrawer from './Components/AppDrawers';
import { Routes, Route } from "react-router-dom";
import ViewLocation from './Components/Pages/ViewLocation';

const menuOptions = [
  { id: '1', name: 'View Location', route:"ViewLocation" },
  { id: '2', name: 'Add location' },
  { id: '3', name: 'Find my group' }
]


function App() {
  return (
    <>
      <AppDrawer menuOptions={menuOptions}/>
      <Routes>
        <Route path="ViewLocation" element={<ViewLocation />} />
      </Routes>

    </>
  );
  }

export default App;
