import createError from 'http-errors';
import express, {type Request, type Response} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import indexRouter from './routes';
import usersRouter from './routes/users';
import warehousesRouter from './routes/warehouses';
import requisitionsRouter from './routes/requisitions';
import stockItemsRouter from './routes/stockItems';
import purchaseOrderRouter from './routes/purchaseOrders';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', warehousesRouter);
app.use('/', requisitionsRouter);
app.use('/', stockItemsRouter);
app.use('/', purchaseOrderRouter);

// catch 404 and forward to error.ejs handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error.ejs handler
app.use(function(err: any, req: Request, res: Response, next: any) {
  // set locals, only providing error.ejs in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error.ejs page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;