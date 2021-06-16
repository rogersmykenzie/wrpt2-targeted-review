require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const {
  register,
  login,
  logout,
} = require('./controllers/authController');

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET
} = process.env;

const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  }
}).then((dbInstance) => {
  app.set('db', dbInstance);
  console.log('database connected');
})

app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

app.post('/auth/register', register);
app.post('/auth/login', login);
app.delete('/auth/logout', logout);
app.get('/api/match');
app.put('/api/answers');

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));