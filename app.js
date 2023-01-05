import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import path, { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {fileURLToPath} from 'url';
import cors from 'cors';

import weatherRoute from './api/routes/weather_route.js';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use(cors({
  credentials: true
}));

app.use('/', weatherRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
