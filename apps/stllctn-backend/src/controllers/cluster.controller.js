const db = require("../models/index.js");
const Cluster = db.Cluster;
const Op = db.Sequelize.Op;

// Create and save a cluster
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.public) {
    res.status(400).send({
      message: "Must define a name and visiblity for the Cluster",
    });
    return;
  }

  // Define the cluster
  const cluster = {
    cluster_name: req.body.name,
    public: req.body.public ? req.body.public : false,
    cluster_desc: req.body.description ? req.body.description : null,
    // slug_id:
  };

  // Write cluster to database
  Cluster.create(cluster)
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cluster.",
      });
    });
};

// Retrieve all clusters from the database
exports.findAll = (req, res) => {
  // If there's a name provided in the query, use it as the search condition
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Cluster.findAll({ where: condition })
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving multiple clusters.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Cluster.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cluster with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Cluster with id: ${id}`,
      });
    });
};

// Update a cluster by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cluster.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        // does this have to be == instead of ===
        res.send({
          message: `Cluster id: ${id} was updated successfully.`,
        });
      } else {
        res.send({
          message: `Cannot update Cluster with id: ${id}. Maybe the Cluster was not found, or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Cluster with id: ${id}`,
      });
    });
};

exports.findAllPublic = (req, res) => {
  Cluster.findAll({ where: { public: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the clusters.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cluster.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        // should this be == instead of === ?
        res.send({
          message: `Cluster id: ${id} was deleted successfully.`,
        });
      } else {
        res.send({
          message: `Cannot delete Cluster with id: ${id}. Maybe Cluster was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Cluster with id: ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Cluster.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} clusters were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurrred while removing all clusters.",
      });
    });
};
