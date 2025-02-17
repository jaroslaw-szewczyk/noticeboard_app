const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const noticesRoutes = require('./routes/notices.routes');
const authRoutes = require('./routes/auth.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb+srv://jaroslawszewczyk:B8hM729BU4VUyhay@cluster0.7ghve.mongodb.net/NoticeBoard?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;

app.use('/api/ads', noticesRoutes);
app.use('/auth/', authRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build/index.html'));
// });

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