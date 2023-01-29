// import { BaseRoute } from 'av-common';
import express, { Request, Response } from 'express';

const userRoutes = require('./user.route');
const tutorialRoutes = require('./tutorial.routes');
const testRoutes = require('./test.route');

const router = express.Router();

router
  .route('/status')  
  // .get(useAuth, (req: Request, res: Response) =>
  .get((req, res) =>
    res.json({ message: 'Success!' })
);

router.use('/users', userRoutes);
router.use('/api/tutorials', tutorialRoutes )
router.use('/test', testRoutes);

module.exports = router;