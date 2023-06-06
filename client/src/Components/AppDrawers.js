import { useState, useEffect } from "react";
import './AppDrawer.css';
import Forms from './Forms';
import './form.css';
import { Link, Outlet } from "react-router-dom";
import AppAccordion from "./AppAccordion";

export default function AppDrawer() {
  const [status, setStatus] = useState(false);

  function handleActiveStatus() {
    setStatus(!status);
  }

  function handleDrawerStatus() {
    handleActiveStatus();
  }

  function showMenu() {
    handleActiveStatus();
  }

  return (
    <>
      <img className='button' onClick={handleActiveStatus} src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu button" />
      <DrawerList CC={showMenu} customOnClick={handleDrawerStatus} activeStatus={status} />
    </>
  );
}

function DrawerList({ activeStatus, customOnClick, CC }) {
  const [user, setUser] = useState(undefined);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [status, setStatus] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('username')
    if (token !== null && user !== undefined) {
      setUser(user);
      setIsAuthorized(true);
    }
  }, []);

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthorized(false);
    setUser(undefined);
  }

  function showLogin() {
    setStatus(!status);
  }

  if (activeStatus && isAuthorized === false) {
    return (
      <>
        <div onClick={customOnClick} className='overlay'>
        </div>
        <div className='drawer'>
          <h2> menu </h2>
          <div className='button-container'>
            <ul>
              <Link className='link' onClick={() => CC()} to="/ViewLocation" > ViewLocation </Link>
              <Link className='link' onClick={() => CC()} to="/AddLocation" > AddLocation </Link>
              <AppAccordion />
              <Link className='link' onClick={() => CC()} to="/GroupLocation"> Locate my Group </Link>
            </ul>
          </div>
          <div>
           <button className="login" onClick={showLogin}> Login </button>
          </div>
        </div>
        <Forms isActive={status} />
      </>
    );
  } else if (activeStatus & isAuthorized ) {
    return (
      <>
      <Outlet />
        <div onClick={customOnClick} className='overlay'>
        </div>
        <div className='drawer'>
          <h2> menu </h2>
          <div>
            <ul className='button-container'>
              <Link className='link' onClick={() => CC()} to="/ViewLocation" > ViewLocation </Link>
              <Link className='link' onClick={() => CC()} to="/AddLocation" > AddLocation </Link>
              <AppAccordion />
            </ul>
          </div>
          <div>
            <button className="signout" onClick={handleSignOut}> Logout </button>
          </div>
        </div>
      </>
    );
}
}
