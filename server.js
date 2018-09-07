import express from 'express';
import { port, host } from './config';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import serverRender from './serverRender';

import apiRouter from './api/server-routes';

// Init App
const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Allow CORS --> what's the use?
server.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// DB config --> hide URIs
mongoose.Promise = global.Promise;
mongoose.connect(to-add, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind('connection error')); {/* eslint-disable-line*/}
db.on('open', function() {
  console.log('Yay connected to DB'); {/* eslint-disable-line*/}
});


// Set the View Engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

// Home Route (with index.ejs)
server.get('/', (req, res) => {
  res.render('index');
});


// Put all API calls under /API
// API Middleware
server.use('/api', apiRouter);

// Express Middleware for serving React static files
server.use(express.static(path.join(__dirname, 'public')));

// Catch 404
server.use((req, res) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// Start Server
server.listen(port, host, () =>
  console.info(`Express listening on port ${port}...`)); {/* eslint-disable-line*/}
