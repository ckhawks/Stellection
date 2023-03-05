const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided.",
    });
  }

  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  db.User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role_name === "Admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requires Admin role.",
      });
      return;
    });
  });
};

// // Don't have a moderator role
// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//     });
//   });
// };

// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }

//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//     });
//   });
// };

module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  // isModerator: isModerator,
  // isModeratorOrAdmin: isModeratorOrAdmin
};
