const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const secret = process.env.SECRET_KEY;

const app = express();

const noticesRoutes = require('./routes/notices.routes');
const authRoutes = require('./routes/auth.routes');

app.use(cors({
    credentials: true, 
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, '/client/dist')));

const MONGO_URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.7ghve.mongodb.net/NoticeBoard?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URL);
const db = mongoose.connection;

app.use(session({
  secret: `${secret}`, 
  store: MongoStore.create({ mongoUrl: MONGO_URL }), 
  resave: false, 
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  }
}));

app.use('/api/ads', noticesRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});