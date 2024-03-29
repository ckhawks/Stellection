const { default: cluster } = require("cluster");
const db = require("../models/index.js");
const Star = db.Star;
const Op = db.Sequelize.Op;
const _ = require("lodash"); //  A JavaScript library that provides utility functions for arrays, numbers, objects, strings, etc.
const crypto = require("crypto");
const path = require("path");

import { md5HashFromBinaryLike } from "../utils/hash";
import { getFileLocationStringFromHashString } from "../utils/files";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

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
// https://www.iana.org/assignments/media-types/media-types.xhtml#image

enum StarType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  UNKNOWN = 'UNKNOWN'
}
/**
 * Determines the correct star type based on the data that was returned from joining with ...
 * @param star 
 * @returns 
 */
function getStarType(star: typeof Star): StarType {
  if (star.StarImage) return StarType.IMAGE;
  if (star.StarVideo) return StarType.VIDEO;
  if (star.StarText) return StarType.TEXT;
  return StarType.UNKNOWN;
}

// function processStarRequest(star: typeof Star) {
//   const starType = getStarType(star);

//   switch (starType) {
//     case StarType.IMAGE:
//       return processImage();
//     case StarType.VIDEO:
//       return processVideo();
//     default:
//       return processText();
//   }
// }

const createStarImage = async (req: Request, res: Response) => {
  // Write Star record, get star_id, relate to starimage_id
  // Write StarImage record, get starimage_id, relate to file_id

  // Write image to file system
  try {
    // check if files included in request
    if (!req.files) {
      await res.status(400).send({
        status: false,
        message: "No file(s) were uploaded.",
      });
      return;
    }

    // Use the name of the input field (aka image) to retrieve the uploaded file
    let image = req.files.image as UploadedFile;

    // check mimetype of files
    if (!ALLOWED_MIMETYPES.includes(image.mimetype)) {
      await res.status(400).send({
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

    // Write File record, get file_id
    const file = await db.File.create({
      md5_hash: hash,
      file_path: new_filepath,
      original_name: image.name,
    });

    console.log("file", file);

    const star = await db.Star.create({
      star_title: image.name,
    });

    console.log("star", star);

    const starImage = await db.StarImage.create({
      file_id: file.file_id,
      star_id: star.star_id,
    });

    console.log("starimage", starImage);

    // Send response
    await res.send({
      status: true,
      message: "File is uploaded",
      data: {
        name: image.name,
        mimetype: image.mimetype,
        size: image.size,
        location: BASE_FILE_DIR + new_filepath,
        star_id: star.star_id,
        starimage_id: starImage.starimage_id,
        file_id: file.file_id,
        // there's also an image.data property with the buffer representation of the image
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// TODO change this to use StarText
const createStarText = (req: Request, res: Response) => {
  // Define the star
  const star = {
    star_title: req.body.star_title,
  };

  // Write star to database
  Star.create(star)
    .then((data: any) => {
      res.send({ data: data });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Star.",
      });
    });
};

// Create and save a star
exports.create = (req: Request, res: Response) => {
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
exports.findAll2 = (req: Request, res: Response) => {
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
    .then((data: any) => {
      res.send({ data: data });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving multiple stars.",
      });
    });
};

// pagination from https://stackoverflow.com/questions/61791627/get-next-offset-for-pagination-sequelize
exports.findAll = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

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
  } catch (err: any) {
    res.json({ error: err.message });
  }
};

// lists all products
// GET /products
// GET /products?limit=2&page=2
// ============================================================
// const listAllProducts = async (req: Request, res: Response) => {
//   const page = req.query.page | 0;
//   const limit = req.query.limit | 10;

//   try {
//     const result = await db.products.findAndCountAll({
//       where: {
//         active: "1",
//       },
//       offset: limit * page,
//       limit,
//       order: [["id", "ASC"]],
//     });

//     res.json(util.response.paging(result, page, limit));
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// };

// Retrieve a single star by id
exports.findOne = async (req: Request, res: Response) => {
  const id = req.params.starId;

  await Star.findByPk(id, {
    include: [
      {
        model: db.Cluster,
        through: { attributes: [] },
        as: "clusters",
        attributes: ["cluster_id", "cluster_name", "public"],
      },
      {
        model: db.StarImage,
        attributes: ["starimage_id"],
        // where: { star_id: star_id },
        required: false,
        include: [
          {
            model: db.File,
            // attributes: ['file_id', 'original_filename']
          },
        ],
      },
      {
        model: db.StarText,
        // as: "startext",
        attributes: ["startext_id"],
        // where: { star_id: star_id },
        required: false,
        include: [
          {
            model: db.File,
            // as: "file",
            // attributes: ['file_id', 'original_filename']
          },
        ],
      },
    ],
    plain: true,
  })
    .then(async (data: any) => {
      if (data) {
        // get next star id
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

        // get prev star id
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
        const starType = getStarType(data);
        const resource_url = process.env.API_URL + "/v1/" + "stars/" + data.star_id + "/resource/" + data.StarImage.File.original_name;

        let return_data = { next: next, prev: prev, star_type: starType, resource: resource_url, ...data_plain };
        delete return_data['StarImage'];
        delete return_data['StarText'];
        console.log("data", return_data);

        // const sendThis = {
        //   data: {
        //     next: next.star_id,
        //     prev: prev.star_id,
        //     ...data,
        //   },
        // };

        // console.log(sendThis);
        res.send({ data: return_data });
      } else {
        res.status(404).send({
          message: `Cannot find Star with id: ${id}`,
        });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).send({
        message: `Error retrieving Star with id: ${id}`,
      });
    });
};

exports.findOneResource = async (req: Request, res: Response) => {
  const id = req.params.starId;
  const fakeFilename = req.params.fakeFilename;

  await Star.findByPk(id, {
    include: [
      {
        model: db.StarImage,
        attributes: ["starimage_id"],
        // where: { star_id: star_id },
        required: false,
        include: [
          {
            model: db.File,
            // attributes: ['file_id', 'original_filename']
          },
        ],
      },
      {
        model: db.StarText,
        // as: "startext",
        attributes: ["startext_id"],
        // where: { star_id: star_id },
        required: false,
        include: [
          {
            model: db.File,
            // as: "file",
            // attributes: ['file_id', 'original_filename']
          },
        ],
      },
    ],
  })
    .then(async (data: any) => {
      // star not found
      if (!data) {
        await res.status(404).send({
          message: `Cannot find Star with id: ${id}`,
        });
        return;
      }

      console.log(data);
      console.log(data.StarImage);

      // console.log(starContent);

      console.log(
        "path",
        "/v1/stars/" + id + "/resource/" + data.StarImage.File.original_name
      );
      if (!fakeFilename) {
        await res.redirect(
          302,
          "/v1/stars/" + id + "/resource/" + data.StarImage.File.original_name
        );
        return;
      }

      // res.send(data);
      res.sendFile(data.StarImage.File.file_path, {
        root: BASE_FILE_DIR,
        headers: { "Content-Disposition": "inline" },
      });

      // res.download(
      //   data.StarImage.File.file_path,
      //   data.StarImage.File.original_name,
      //   { root: BASE_FILE_DIR }
      // );

      // return associated content from star

      // express how serve file as filename ?
    })
    .catch(async (err: any) => {
      console.log(err);
      await res.status(500).send({
        message: `Error retrieving Star with id: ${id}`,
      });
      return;
    });
};

// TODO add update, findAllPublic, delete, deleteAll
