const { createServer } = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5500;

const server = createServer(app);

import * as slug from './utils/slug.js';

// slug.testHashids();

// Use for slug generation
// https://hashids.org/

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// add cors
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to STELLECTION-API backend application awesome RESTful API endpoint host." });
});

// db stuff
const db = require('./models/index.js');
// console.log("db ", db);
// THIS DROPS TABLES DESTROYING DATA. IT SHOULD NEVER BE DONE IN PRODUCTION
// db.sequelize.sync({ force: true })
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((error) => {
//     console.log("Failed to sync db: " + error.message);
//   })

// add the routes in
const routes = require('./routes');
app.use('/v1', routes);

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (
//       process.env.DEPLOYMENT_ENV === 'development' ||
//       process.env.NODE_ENV === 'test' ||
//       knownDomains.indexOf(origin) !== -1
//     ) {
//       callback(null, true);
//     } else {
//       console.error('Request submitted from unknown origin', origin);
//       callback(new Error('Not allowed'));
//     }
//   }
// };
// // enable CORS - Cross Origin Resource Sharing
// app.use('*', cors(corsOptions));



// https://dev.to/richienabuk/setting-up-express-js-rest-api-postgres-and-sequelize-orm-with-es6-4m08

// listen for requests
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = server;