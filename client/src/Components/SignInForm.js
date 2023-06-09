import { useState } from 'react';
import './form.css';

export default function SignInForm({ onSubmit, statusMessage }) {
  const [passWord, setPassWord] = useState('');
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');

 async function handleSubmit(e) {
  e.preventDefault();
    if (passWord === '' || userName === '') {
      setText('A username & password is required');
    } else {
    const user = {
      userName,
      passWord,
    };
    onSubmit(user);
    setText('');
  }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> {text} </h1>
        <h1> {statusMessage} </h1>
        <label>
          username
          <input
          name="userName"
          type="userName"
          value={userName}
          onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          password
          <input
            name='passWord'
            type='password'
            value={passWord}
            onChange={e => setPassWord(e.target.value)} />
        </label>
        <button className ="submit" type="submit"> Sign In </button>
      </form>
    </div>
  )
}
