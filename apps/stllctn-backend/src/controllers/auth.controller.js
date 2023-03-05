const db = require("../models");
const config = require("../config/auth.config");

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
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
