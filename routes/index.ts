import express, { type Express, type Request, type Response } from 'express';
const router = express.Router();

export const getHandler = (req: Request, res: Response, next: any)=> {
  res.render('index', { title: 'Express' });
}

/* GET home page. */
router.get('/', getHandler);

export default router;
