import { useState } from 'react';


export default  function SignUpForm() {
  const [passWord, setPassWord] = useState('');
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');

//  async function submitInfo() {
//     Event.preventDefault();
//     try {
//       if (passWord === '' || userName === '') {
//         setText('A usedrname & password is required');
//       } else if (passWord.length < 8) {
//         setText('Your password is too short');
//       }
//       const hashedPassWord = await argon2.hash(passWord);
//       const params = [userName, hashedPassWord];
//       const sql = `
//       insert into "Users" ("name", "password")
//       values($1,$2)
//       returning "username";
//       `;
//       await db.query(sql, params);
//     }
//       catch(err) {
//         console.error(err);
//       }
//     }

  return (
    <div>
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
      <button> Submit </button>
      <h1> {text} </h1>
    </div>
  )
}
