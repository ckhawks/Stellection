const express = require("express");

const router = express.Router();

const star = require("../controllers/star.controller");

// get all stars
// GET /api/stars
router.get("/", star.findAll);

// Create new star
// POST /api/stars
router.post("/", star.create);

// Get all public stars
// GET /api/stars/public
// router.get("/public", star.findAllPublic);

// Get a single star by ID
// GET /api/stars/27
router.get("/:starId", star.findOne);

// Update a star by ID
// PATCH /api/stars/27
// router.patch("/:starId", star.update);

// Delete a star by ID
// DELETE /api/stars/27
// router.delete("/:starId", star.delete);

// Delete all stars
// DELETE /api/stars
// router.delete("/", stars.deleteAll);

module.exports = router;
