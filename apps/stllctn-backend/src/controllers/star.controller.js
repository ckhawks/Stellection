const db = require("../models/index.js");
const Star = db.Star;
const Op = db.Sequelize.Op;

// Create and save a star
exports.create = (req, res) => {
  // Validate request
  if (!req.body.star_title) {
    res.status(400).send({
      message: "Must define a name for the star",
    });
    return;
  }

  // Define the star
  const star = {
    star_title: req.body.star_title,
  };

  // Write star to database
  Star.create(star)
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Star.",
      });
    });
};

// Retrieve all stars from the database
exports.findAll = (req, res) => {
  // If there's a name provided in the query, use it as the search condition
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Star.findAll({ where: condition })
    .then((data) => {
      res.send({ data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving multiple stars.",
      });
    });
};

// Retrieve a single star by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Star.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Star with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Star with id: ${id}`,
      });
    });
};

// TODO add update, findAllPublic, delete, deleteAll
