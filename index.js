const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
dotenv.config();
//Connect to Mongo DB
mongoose.connect(process.env.DB_CONNECT, 
{useNewUrlParser: true},
() => console.log('connected to db'))

//Route middlewares
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Up and running'));
