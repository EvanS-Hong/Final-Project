import './App.css';
import { useState, useEffect } from 'react';
import AppDrawer from './Components/AppDrawers';

const menuOptions = [
  { id: '1', name: 'View Location' },
  { id: '2', name: 'Add location' },
  { id: '3', name: 'Find my group' }
]


function App() {
  return (
    <>
      <AppDrawer menuOptions={menuOptions}/>
    </>
  );
  }

export default App;
