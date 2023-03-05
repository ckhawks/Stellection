const verifySignUp = require("../middleware/verifySignUp");
const auth = require("../controllers/auth.controller");

const express = require("express");
// const { GetCompanyCategoriesRoute } = require('av-common');

// const controller = require('../../controllers/companyCategory.controller');

// const { checkAuth0Token } = require('../../middlewares/auth');

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// POST /api/auth/signup
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  auth.signup
);

// POST /api/auth/signin
router.post("/signin", auth.signin);

module.exports = router;
