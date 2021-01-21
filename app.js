const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRouter');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// just for local test
// it can remove error cors (http)
app.use(
  cors({
    origin: ['http://127.0.0.1:8000', 'https://adminttshopvn.herokuapp.com'],
    credentials: true,
    exposedHeaders: ['X-Paging-Count', 'X-Paging-Current']
  })
);

app.options('*', cors());

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// FOR VIEW (SERVER RENDER) (uncomment for test render)
app.use('/', viewRouter);

// FOR API (CLIENT RENDER) (uncomment for test api)
app.use('/api/v1/user', userRouter);
app.use('/api/v1/racket', racketRouter);
app.use('/api/v1/review', reviewRouter);

// default middleware handler
// app.use(function(err, req, res, next))
app.use(errorHandler.globalErrorHandler);

module.exports = app;
