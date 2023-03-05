const { createServer } = require("http");
const express = require("express");
const fileUpload = require('express-fileupload'); // Simple Express middleware for uploading files. It parses multipart/form-data requests, extracts the files if available, and makes them available under the req.files property.
const cors = require("cors");
const morgan = require('morgan'); // Node.js middleware for logging HTTP requests.

const app = express();
const PORT = process.env.PORT || 5500;

const server = createServer(app);

import { Request, Response } from "express";
import { Model } from "sequelize";
import * as slug from "./utils/slug";

// slug.testHashids();

// Use for slug generation
// https://hashids.org/

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// add cors
const corsOptions = {
  origin: "http://localhost:5500" // todo probably going to be an issue when deploying to prod
}
app.use(cors(corsOptions));

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.use(morgan('dev'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// simple route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message:
      "Welcome to STELLECTION-API backend application awesome RESTful API endpoint host.",
  });
});

// db stuff
const db = require("./models/index.js");
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
const routes = require("./routes");
app.use("/v1", routes);

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

export default server;
export { app };
