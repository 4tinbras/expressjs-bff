import express, { type Express, type Request, type Response } from 'express';
const router = express.Router();


/* GET home page. */
router.get('/', function(req: Request, res: Response, next) {
  res.render('index', { title: 'Express' });
});


