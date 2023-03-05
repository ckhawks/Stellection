const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

const express = require("express");

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/all", user.allAccess);

router.get("/user", [authJwt.verifyToken], user.userBoard);

// router.get(
//   "/mod",
//   [authJwt.verifyToken, authJwt.isModerator],
//   user.moderatorBoard
// );

router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], user.adminBoard);

module.exports = router;
