import { useEffect, useState } from 'react';
import './App.css';
import Users from './Components/Users';

function App() {
  return (
    <>
      <img className='button'  src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu button" />
        <Users />
    </>
  );
}

export default App;
