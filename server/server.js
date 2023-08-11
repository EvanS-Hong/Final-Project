import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import ClientError from './lib/client-error.js';

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

app.get('/api/Locations', async (req, res, next) => {
  try {
    const sql = `
    select *
      from "Locations"
      order by "LocationID"
      `;
    const results = await db.query(sql);
    res.json(results.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/Users/sign-up', async (req, res, next) => {
  try {
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
  } catch (err) {
    if (err.code === '23505') {
      res.json({ message: 'User is Taken' });
    } else {
      next(err);
    }
  }
});

app.post('/api/Users/sign-in', async (req, res, next) => {
  try {
    const { userName, passWord } = req.body;
    const sql = `
    select "UserID",
    "Password"
    from "Users"
    where "Username"=$1 `;
    const params = [userName];
    const result = await db.query(sql, params);
    const users = result.rows[0];
    if (!users) throw new ClientError(400);
    const isMatching = await argon2.verify(users.Password, passWord);
    if (isMatching === false) throw new ClientError(400);
    const payload = {
      userID: users.UserID,
      userName
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.status(200).json({ payload, token });
  } catch (err) {
    res.json({ message: 'Invalid Login' });
  }
});

app.post('/api/Locations/add-location', async (req, res, next) => {
  try {
    const { lat, lng, locationName, description, region, country } = req.body;
    console.log(req.body);
    const params = [country, region, lat, lng, locationName, description];
    const sql = `
    insert into "Locations" ("Country", "Region", "Latitude", "Longitude", "Name", "Description")
    values($1, $2, $3, $4, $5, $6)
    returning *;
    `;
    const results = await db.query(sql, params);
    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.put('/api/Locations/edit-location', async (req, res, next) => {
  try {
    const { lat, lng, locationName, description, region, country, locationID } = req.body;
    console.log(req.body);
    const params = [country, region, lat, lng, locationName, description, locationID];
    const sql = `
    update "Locations"
    set "Country" = $1,
        "Region" = $2,
        "Latitude" = $3,
        "Longitude" = $4,
        "Name" = $5,
        "Description" = $6
    Where "LocationID" = $7;
    `;
    const results = await db.query(sql, params);
    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
