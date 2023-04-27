import './App.css';
import { useState, useEffect } from 'react';
import AppDrawer from './Components/AppDrawers';
import { Routes, Route } from "react-router-dom";
import ViewLocation from './Components/Pages/ViewLocation';
import AddLocation from './Components/Pages/AddLocation';
import SavedLocation from './Components/Pages/SavedLocation';


function App() {
  return (
    <>
      <AppDrawer />
      <Routes>
        <Route path="ViewLocation" element={<ViewLocation />} />
        <Route path="AddLocation" element={<AddLocation />} />
        <Route path="SavedLocation" element={<SavedLocation /> } />
      </Routes>

    </>
  );
  }

export default App;
