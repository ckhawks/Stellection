const db = require("../models");
const config = require("../config/auth.config");

const ACCESS_CODES = process.env.ACCESS_CODES.toUpperCase().split(",");
console.log("ACCESS_CODES:", ACCESS_CODES);

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Body validations
  console.log("req.body", req.body);
  if (!req.body.username) {
    return res.status(400).send({
      message: "No username included.",
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "No email included.",
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "No password included.",
    });
  }

  if (!req.body.access_code) {
    return res.status(400).send({
      message: "No access_code included.",
    });
  }

  // Invalid access code
  if (!ACCESS_CODES.includes(req.body.access_code.toUpperCase())) {
    return res.status(400).send({
      message: "Access code invalid.",
    });
  }

  // Username already in use check
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use.",
      });
      return;
    }

    // Email already in use check
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use.",
        });
        return;
      }
    });
  });

  // Check roles exist
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!db.ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role `" + req.body.roles[i] + "does not exist.",
        });
        return;
      }
    }
  }

  // Save User to database
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        db.Role.findAll({
          // TODO change this logic so that you cant sign up as any roles
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message: "User was registered successfully!",
            });
          });
        });
      } else {
        db.Role.findOne({
          where: {
            role_name: "User",
          },
        })
          .then((userRole) => {
            if (!userRole) {
              res.status(400).send({
                message: "Could not locate user role.",
              });
              return;
            }

            console.log(userRole);
            console.log("userRole.role_id", userRole.role_id);
            console.log(user);

            // user role = 1 (user)
            user.addRole(userRole).then(() => {
              res.send({
                message: "User was registered successfully!",
              });
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "err5" + err.message,
            });
            return;
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "err2" + err.message,
      });
    });
};

exports.signin = (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password_hash
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }

      var token = jwt.sign({ id: user.user_id }, config.jwt_secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].role_name.toUpperCase());
        }
        res.cookie("token", token, { httpOnly: true });
        res.status(200).send({
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
  });
};

exports.verifytoken = (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided.",
    });
  }

  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized! Please log in again.",
      });
    }

    const userId = decoded.id;

    db.User.findByPk(userId, {
      attributes: ["user_id", "email", "username"],
    })
      .then((user) => {
        var authorities = [];
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].role_name.toUpperCase());
          }
          return res.status(200).send({
            username: user.username,
            email: user.email,
            user_id: user.user_id,
            roles: authorities,
          });
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || err,
        });
      });

    req.userId = decoded.id;
  });
};
