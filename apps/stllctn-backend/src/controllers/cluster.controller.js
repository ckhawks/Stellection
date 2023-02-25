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

  Cluster.findAll({
    where: condition,
    include: [
      {
        model: db.Star,
        as: "stars",
        // through: { attributes: ["created_at"], as: "cluster_star" },
        through: { attributes: [] },
        attributes: ["star_id", "star_title"],
      },
    ],
  })
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
  const id = req.params.clusterId;

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
  const id = req.params.clusterId;

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
  Cluster.findAll({
    where: { public: true },
    include: [
      {
        model: db.Star,
        as: "stars",
        // through: { attributes: ["created_at"], as: "cluster_star" },
        through: { attributes: [] },
        attributes: ["star_id", "star_title"],
      },
    ],
  })
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
  const id = req.params.clusterId;

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

exports.addStarToClusterOLDWATERFALL = async (req, res) => {
  const { clusterId, starId } = req.params;
  // console.log("params", starId, clusterId);

  await Cluster.findByPk(clusterId)
    .then(async (cluster) => {
      if (cluster) {
        // successfully found cluster
        // console.log("data1:", cluster);

        // locate star by id
        await db.Star.findByPk(starId)
          .then(async (star) => {
            if (!star) {
              res.status(500).send({
                message: `Error retrieving Star with id: ${starId} (1)`,
              });
              return;
            }
            // console.log("data2:", star);
            // add star to cluster
            await cluster
              .addStar(star)
              .then((cluster_star) => {
                // console.log("data3:", cluster_star);
                if (!cluster_star) {
                  res.status(500).send({
                    message: `Error adding Star id: ${starId} to Cluster id: ${clusterId} (likely already exists) (1)`,
                  });
                  return;
                }
                res.send({ data: cluster_star });
                return;
              })
              .catch((err3) => {
                console.log("err3", err3);
                res.status(500).send({
                  message: `Error adding Star id: ${starId} to Cluster id: ${clusterId} (2)`,
                });
                return;
              });
          })
          .catch((err2) => {
            console.log("err2", err2);
            res.status(500).send({
              message: `Error retrieving Star with id: ${starId} (2)`,
            });
            return;
          });
      } else {
        res.status(404).send({
          message: `Cannot find Cluster with id: ${clusterId}`,
        });
        return;
      }
    })
    .catch((err) => {
      console.log("err1", err);
      res.status(500).send({
        message: `Error retrieving Cluster with id: ${clusterId}`,
      });
      return;
    });
};

exports.addStarToCluster = async (req, res) => {
  const { clusterId, starId } = req.params;

  // search for cluster
  const cluster = await Cluster.findByPk(clusterId).catch((err) => {
    // console.log("err1", err);
    res.status(500).send({
      message: `Error retrieving Cluster with id: ${clusterId}`,
    });
    return;
  });

  // check if no cluster found
  if (!cluster) {
    res.status(404).send({
      message: `Cannot find Cluster with id: ${clusterId}`,
    });
    return;
  }

  // search for star
  const star = await db.Star.findByPk(starId).catch((err) => {
    res.status(500).send({
      message: `Error retrieving Star with id: ${starId}`,
    });
    return;
  });

  // check if no star found
  if (!star) {
    res.status(404).send({
      message: `Cannot find Star with id: ${starId}`,
    });
    return;
  }

  // try add star to cluster
  const cluster_star = await cluster.addStar(star).catch((err3) => {
    console.log("err3", err3);
    res.status(500).send({
      message: `Error adding Star id: ${starId} to Cluster id: ${clusterId} (2)`,
    });
    return;
  });

  // check if no cluster_star found
  if (!cluster_star) {
    // check if the cluster already has the star
    const cluster_star = await cluster.getStars({ where: { star_id: starId } });
    if (cluster_star) {
      res.status(400).send({
        message: `Error adding Star id: ${starId} to Cluster id: ${clusterId} (already exists) (3)`,
      });
      return;
    }

    // must have been an ERROR
    res.status(500).send({
      message: `Error adding Star id: ${starId} to Cluster id: ${clusterId} (1)`,
    });
    return;
  }

  // worked
  res.send({ data: cluster_star });
};

exports.deleteStarFromCluster = async (req, res) => {
  const { clusterId, starId } = req.params;

  // search for cluster
  const cluster = await Cluster.findByPk(clusterId).catch((err) => {
    // console.log("err1", err);
    res.status(500).send({
      message: `Error retrieving Cluster with id: ${clusterId}`,
    });
    return;
  });

  // check if no cluster found
  if (!cluster) {
    res.status(404).send({
      message: `Cannot find Cluster with id: ${clusterId}`,
    });
    return;
  }

  // search for star
  const star = await db.Star.findByPk(starId).catch((err) => {
    res.status(500).send({
      message: `Error retrieving Star with id: ${starId}`,
    });
    return;
  });

  // check if no star found
  if (!star) {
    res.status(404).send({
      message: `Cannot find Star with id: ${starId}`,
    });
    return;
  }

  // try remove star from cluster
  const deleted = await cluster.removeStar(star).catch((err3) => {
    console.log("err3", err3);
    res.status(500).send({
      message: `Error removing Star id: ${starId} from Cluster id: ${clusterId} (2)`,
    });
    return;
  });

  if (!deleted) {
    // todo fix error handling here
    res.status(500).send({
      message: "failed lol",
    });
    return;
  }

  console.log(deleted);
  res.send({ data: deleted });
};
