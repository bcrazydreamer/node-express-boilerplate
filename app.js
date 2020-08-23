const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morganLogger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const _ = require('lodash');
const htmlCompressor = require('html-compressor');
const requestIp = require('request-ip');
const logger = require('./utility/logger.utility');
const { sendError, sendSuccess } = require('./utility/response.utility');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
require('./utility/database.utility');

const app = express();


app.use(compression());
app.use(helmet());

// will minify the render html
app.use(htmlCompressor({
    render: true,
    css: true,
    js: true
}));

// custom
app.use((req, res, next) => {
    req.logger = logger;
    res.sendError = sendError;
    res.sendSuccess = sendSuccess;
    req.clientIp = requestIp.getClientIp(req);
    let ua = 'br';
    if (_.isString(req.headers['user-agent'])) {
        ua = req.headers['user-agent'].replace(/\s/g, "").toLowerCase();
    }
    req.customUserAgent = ua;
    return next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morganLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;