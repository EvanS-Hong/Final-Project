import { useState } from 'react';

export default function SignUpForm({ onSubmit, statusMessage }) {
  const [passWord, setPassWord] = useState('');
  const [userName, setUserName] = useState('');
  const [secondPassWord, setSecondPassWord] = useState('');
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (passWord === '' || userName === '') {
      setText('A username & password is required');
    } else if (passWord.length < 8) {
      setText('Your password is too short');
    } else if (passWord !== secondPassWord) {
      setText('Passwords do not match');
    } else {
      const newUser = {
        userName,
        passWord,
      };
      onSubmit(newUser);
      setText('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <label>
          password
          <input
            name='confirmPassWord'
            type='password'
            value={secondPassWord}
            onChange={e => setSecondPassWord(e.target.value)} />
        </label>
        <button type="submit"> Sign Up </button>
        <h1> {text} </h1>
        <h1> {statusMessage} </h1>
      </form>
    </div>
  )
}
