const express = require('express');
// const { GetCompanyCategoriesRoute } = require('av-common');

// const controller = require('../../controllers/companyCategory.controller');

// const { checkAuth0Token } = require('../../middlewares/auth');

const router = express.Router();

// router.use(checkAuth0Token);

// const { CompanyCategory } = require('../models');
// const {
//   getCompanyCategories
// } = require('../services/companyHierarchy/companyCategory/getCompanyCategories');
// const { captureError } = require('../utils/logs');
// const { buildErrorMsg } = require('../utils/methods');

router
    .route('/users')
    .get(async (req, res) => {
        try {
            const response = await getCompanyCategories();
        
            res.json(response);
        } catch (error) {
            captureError(error);
            console.error('getCompanyCategories', error);
            res.status(500).send({
              message: buildErrorMsg('getting company categories'),
              errorType: error.message
            });
        }
    });

router
    .route('/users')
    .post(async (req, res) => {
        try {
            const { name } = req.body;
        
            const [companyCategory, created] = await CompanyCategory.findOrCreate({
              where: { name: name.toUpperCase().trim() },
              attributes: ['id', 'name']
            });
        
            if (!created) {
              res.status(500).send({
                message: `${req.query.name} already exists`,
                created
              });
            }
        
            res.json({ companyCategory, created });
        } catch (error) {
            captureError(error);
            console.error('createAssignee', error);
            res.status(500).send({
              message: buildErrorMsg('creating a company category')
            });
        }
    });

module.exports = router;