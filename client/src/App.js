import './App.css';
import Users from './Components/Users';
import { useState } from 'react';



function App() {

const [status, setStatus] = useState(false);

function showLogin() {
  setStatus(!status);
}

  return (
    <>
      <img className='button' src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu button" />
        <button onClick={showLogin}> Login </button>
        <Users isActive={status}/>
    </>
  );
}

export default App;
