import { useEffect, useState } from 'react';
import SignUpForm from './SignUpform';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [message, setMessage] = useState('');


  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('/api/Users');
        const jsonData = await res.json();
        if (!res.ok) {
          throw new Error(`error ${res.status}`);
        } else {
          setUsers(jsonData);
        }
      } catch (err) {
        setError(err);
      }
    }
    getUsers();
  }, []);


  async function addUsers(newUser) {
    try {
      const res = await fetch('/api/Users', {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      const jsonData = await res.json();
      if (jsonData.message) {
        console.log(jsonData);
        setMessage(jsonData);
      } else {
        setUsers(prev => users.concat(jsonData));
        setMessage('Registration successful');
      }
    } catch (err) {
      setError(err)
    }
  }

  return (
    <SignUpForm statusMessage={message} onSubmit={addUsers} />
  );

  }
