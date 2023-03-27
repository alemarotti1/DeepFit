const express = require('express');




//importing the routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const insightsRouter = require('./routes/insights');



const app = express();
app.use(express.json());


//defining the standard routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/insights', insightsRouter);

module.exports = app;
