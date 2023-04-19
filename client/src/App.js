import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import  SignUpForm from './Signupform.js';

function App() {
  return (
    <>
      <img className='button'  src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu button" />
        <SignUpForm />
    </>
  );
}

export default App;
