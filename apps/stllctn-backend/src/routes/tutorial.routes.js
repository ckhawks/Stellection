const express = require('express');

var router = express.Router();

const tutorials = require("../controllers/tutorial.controller.js");

// Create a new tutorial
router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with an id
router.get("/:id", tutorials.findOne);

// Update a Tutorial with an id
router.put("/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Delete all Tutorials
router.delete("/", tutorials.deleteAll);

module.exports = router