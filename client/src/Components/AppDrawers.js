import { useState, useEffect } from "react";
import './AppDrawer.css';
import Forms from './Forms';
import './form.css';

export default function AppDrawer({ menuOptions }) {
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState('');

  function handleActiveStatus() {
    setStatus(!status);
  }

  function handleDrawerStatus(name) {
    handleActiveStatus();
  }

  function showMenu(name) {
    handleActiveStatus();
    setTitle(name);
  }

  return (
    <>
      <img className='button' onClick={handleActiveStatus} src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu button" />
      <CreateDrawerList CC={showMenu} customOnClick={handleDrawerStatus} activeStatus={status} menuOptions={menuOptions} />
      <p> {title} </p>
    </>
  );
}


export function CreateDrawerList({ menuOptions, activeStatus, customOnClick, CC }) {
  const [user, setUser] = useState(undefined);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [status, setStatus] = useState(false);


  const listItems = menuOptions.map(menuOptions =>
    <li key={menuOptions.id}>
      <button onClick={() => CC(menuOptions.name)}> {menuOptions.name} </button>
    </li>
  );


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

  if (activeStatus === true & isAuthorized === false) {
    return (
      <>
        <div onClick={customOnClick} className='overlay'>
        </div>
        <div className='drawer'>
          <h2> menu </h2>
          <ul> {listItems} </ul>
          <button className="login" onClick={showLogin}> Login </button>
        </div>
        <Forms isActive={status} />
      </>
    );
  } else if (activeStatus === true & isAuthorized === true) {
    return (
      <>
        <div onClick={customOnClick} className='overlay'>
        </div>
        <div className='drawer'>
          <h2> menu </h2>
          <ul> {listItems} </ul>
          <button className="signout" onClick={handleSignOut}> Logout </button>
        </div>

      </>
    );
}
}
