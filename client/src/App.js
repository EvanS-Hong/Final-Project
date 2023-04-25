import './App.css';
import { useState, useEffect } from 'react';
import AppDrawer from './Components/AppDrawers';
import { Routes, Route } from "react-router-dom";
import ViewLocation from './Components/Pages/ViewLocation';
import AddLocation from './Components/Pages/AddLocation';

const menuOptions = [
  { id: '1', name: 'View Location', route:"ViewLocation" },
  { id: '2', name: 'Add location' },
  { id: '3', name: 'Find my group' }
]


function App() {
  return (
    <>
      <AppDrawer />
      <Routes>
        <Route path="ViewLocation" element={<ViewLocation />} />
        <Route path="AddLocation" element={<AddLocation />} />
      </Routes>

    </>
  );
  }

export default App;
