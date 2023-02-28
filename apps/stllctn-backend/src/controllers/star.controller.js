const { default: cluster } = require("cluster");
const db = require("../models/index.js");
const Star = db.Star;
const Op = db.Sequelize.Op;
const _ = require("lodash"); //  A JavaScript library that provides utility functions for arrays, numbers, objects, strings, etc.
const crypto = require("crypto");
const path = require("path");

import { md5HashFromBinaryLike } from "../utils/hash";
import { getFileLocationStringFromHashString } from "../utils/files";

// {
//   type: "image" / "text"
// }

const BASE_FILE_DIR = "/data/stellection-data/files/";
const ALLOWED_MIMETYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/webp",
];

const createStarImage = (req, res) => {
  // Write image to file system
  // Write File record, get file_id
  // Write Star record, get star_id, relate to starimage_id
  // Write StarImage record, get starimage_id, relate to file_id

  try {
    // check if files included in request
    if (!req.files) {
      res.status(400).send({
        status: false,
        message: "No file(s) were uploaded.",
      });
      return;
    }

    // Use the name of the input field (aka image) to retrieve the uploaded file
    let image = req.files.image;

    // check mimetype of files
    if (!ALLOWED_MIMETYPES.includes(image.mimetype)) {
      res.status(400).send({
        status: false,
        message: "File format not allowed. " + image.mimetype,
      });
      return;
    }

    const hash = md5HashFromBinaryLike(image.data);
    const file_extension = path.extname(image.name);
    let new_filepath =
      getFileLocationStringFromHashString(hash) + hash + file_extension;

    // Use the mv() method to place the file in the upload directory
    image.mv(BASE_FILE_DIR + new_filepath);

    // Send response
    res.send({
      status: true,
      message: "File is uploaded",
      data: {
        name: image.name,
        mimetype: image.mimetype,
        size: image.size,
        location: BASE_FILE_DIR + new_filepath,
        // there's also an image.data property with the buffer representation of the image
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// TODO change this to use StarText
const createStarText = (req, res) => {
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

// Create and save a star
exports.create = (req, res) => {
  // Validate request
  if (!req.body.star_title) {
    res.status(400).send({
      message: "Must define a name for the star",
    });
    return;
  }

  if (!req.body.star_type) {
    res.status(400).send({
      message: "Must define a type for the star",
    });
    return;
  }

  switch (req.body.star_type) {
    case "image":
      createStarImage(req, res);
      return;
    case "text":
      createStarText(req, res);
      return;
    default:
      res.status(400).send({
        message: "Unable to handle provided star_type.",
      });
      return;
  }
};

// Retrieve all stars from the database
exports.findAll2 = (req, res) => {
  // If there's a name provided in the query, use it as the search condition
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Star.findAll({
    where: condition,
    include: [
      {
        model: db.Cluster,
        as: "clusters",
        // through: { attributes: ["created_at"], as: "cluster_star" },
        through: { attributes: [] },
        attributes: ["cluster_id", "cluster_name", "public"],
      },
    ],
  })
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

// pagination from https://stackoverflow.com/questions/61791627/get-next-offset-for-pagination-sequelize
exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await Star.findAndCountAll({
      // where: {
      //   active: "1",
      // },
      offset: limit * page,
      limit,
      order: [["star_id", "ASC"]],
    });

    res.json({
      page,
      limit,
      total: result.count,
      data: result.rows,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// lists all products
// GET /products
// GET /products?limit=2&page=2
// ============================================================
const listAllProducts = async (req, res) => {
  const page = req.query.page | 0;
  const limit = req.query.limit | 10;

  try {
    const result = await db.products.findAndCountAll({
      where: {
        active: "1",
      },
      offset: limit * page,
      limit,
      order: [["id", "ASC"]],
    });

    res.json(util.response.paging(result, page, limit));
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Retrieve a single star by id
exports.findOne = async (req, res) => {
  const id = req.params.starId;

  await Star.findByPk(id, {
    include: [
      {
        model: db.Cluster,
        through: { attributes: [] },
        as: "clusters",
        attributes: ["cluster_id", "cluster_name", "public"],
      },
    ],
    plain: true,
  })
    .then(async (data) => {
      if (data) {
        const next = await Star.findAll({
          attributes: ["star_id"],
          where: {
            star_id: {
              [Op.gt]: data.star_id,
            },
          },
          limit: 1,
          plain: true,
          order: [["star_id", "ASC"]],
        });

        const prev = await Star.findAll({
          attributes: ["star_id"],
          where: {
            star_id: {
              [Op.lt]: data.star_id,
            },
          },
          limit: 1,
          plain: true,
          order: [["star_id", "DESC"]],
        });

        // plain: true because https://stackoverflow.com/a/71090541
        const data_plain = data.get({ plain: true });
        console.log("data_plain: ", data_plain);
        // console.log("prev_plain", prev_plain);

        // console.log("prev", prev.star_id);
        console.log("next", next);
        // console.log("star", data);
        // console.log("star/clusters", data.clusters);

        data = { next: next, prev: prev, ...data_plain };
        console.log("data", data);

        // const sendThis = {
        //   data: {
        //     next: next.star_id,
        //     prev: prev.star_id,
        //     ...data,
        //   },
        // };

        // console.log(sendThis);
        res.send({ data: data });
      } else {
        res.status(404).send({
          message: `Cannot find Star with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Error retrieving Star with id: ${id}`,
      });
    });
};

// TODO add update, findAllPublic, delete, deleteAll
