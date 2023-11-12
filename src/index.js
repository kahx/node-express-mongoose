require('./models/User');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
});
mongoose.connection.on('connected', () => {
    console.log('mongoose connected');
});
mongoose.connection.on('error', (err) => {
   console.log('mongoose error ', err) 
});
app.get('/', requireAuth, (req, res) => {
    res.send(`Merhaba, ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening');
});