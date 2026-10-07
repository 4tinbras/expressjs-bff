import express, { type Express, type Request, type Response } from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/users/', function(req: Request, res: Response, next) {
  res.send('respond with a resource');
});

export default router;