import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import argon2 from 'argon2';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/Users', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "Users"
        order by "UserID"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/Users', async (req, res, next) => {
  try {
    if (res.ok) {
      const { userName, passWord } = req.body;
      const hashedPassWord = await argon2.hash(passWord);
      const params = [userName, hashedPassWord, 'user', 0, 0];
      const sql = `
      insert into "Users" ("Username", "Password", "Role", "Latitude", "Longitude")
      values($1, $2, $3, $4, $5)
      returning "UserID","Username";
      `;
      const results = await db.query(sql, params);
      res.json(results.rows[0]);
    }
  } catch (err) {
    if (err.code === 23505) {
      console.log('hello');
      res.json({ message: 'User is Taken' });
    } next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
