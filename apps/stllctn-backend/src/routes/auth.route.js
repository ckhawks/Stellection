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
router.post("/signup", auth.signup);

// POST /api/auth/signin
router.post("/signin", auth.signin);

// POST /api/auth/verifytoken
router.post("/verifytoken", auth.verifytoken);

// POST /api/auth/signout
router.post("/signout", auth.signout);

module.exports = router;
