const express = require("express");

const router = express.Router();

const cluster = require("../controllers/cluster.controller");

// get all clusters
// GET /api/clusters
router.get("/", cluster.findAll);

// Create new cluster
// POST /api/clusters
router.post("/", cluster.create);

// Get all public clusters
// GET /api/clusters/public
router.get("/public", cluster.findAllPublic);

// Get a single cluster by ID
// GET /api/clusters/27
router.get("/:clusterId", cluster.findOne);

// Update a cluster by ID
// PATCH /api/clusters/27
router.patch("/:clusterId", cluster.update);

// Delete a cluster by ID
// DELETE /api/clusters/27
router.delete("/:clusterId", cluster.delete);

// Delete all clusters
// DELETE /api/clusters
// router.delete("/", clusters.deleteAll);

// Add star to cluster
// POST /api/clusters/27/stars/2
router.post("/:clusterId/stars/:starId", cluster.addStarToCluster);

// Remove star from cluster
// DELETE /api/clusters/27/stars/2
router.delete("/:clusterId/stars/:starId", cluster.deleteStarFromCluster);

module.exports = router;
