const winston = require('winston');
const _ = require('lodash');
const rootPath = require('app-root-path').path;
const config = require('../config');

const logpath = (config.LOGPATH || `${rootPath}/logs/`);

const getFileDateTime = () => {
    const current_date = new Date();
    return `${current_date.getFullYear()}_${current_date.getMonth() + 1}_${current_date.getDate()}`;
}

const getTimestamp = (_m) => {
    if (_m === 1) {
        return new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    }
    return new Date();
}

const getFormat = () => {
    return winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    )
}

const getFileName = (dir = "application_", level) => {
    let _dir = dir;
    if (!_.isString(_dir)) {
        _dir = 'application_';
    } else {
        _dir = (dir[dir.length - 1] !== '_') ? `${dir}_` : dir;
    }
    const _f = logpath + dir;
    return `${_f + level}_${getFileDateTime()}.log`;
}

const debug = (dir) => {
    const _fn = getFileName(dir, 'debug');
    return winston.createLogger({
        levels: {
            debug: 0
        },
        format: getFormat(),
        defaultMeta: { IST: getTimestamp(1) },
        transports: [
            new (winston.transports.File)({ filename: _fn, level: 'debug' })
        ]
    });
}

const info = (dir) => {
    const _fn = getFileName(dir, 'info');
    return winston.createLogger({
        levels: {
            info: 1
        },
        format: getFormat(),
        defaultMeta: { IST: getTimestamp(1) },
        transports: [
            new (winston.transports.File)({ filename: _fn, level: 'info' })
        ]
    });
}

const warn = (dir) => {
    const _fn = getFileName(dir, 'warn');
    return winston.createLogger({
        levels: {
            warn: 2
        },
        format: getFormat(),
        defaultMeta: { IST: getTimestamp(1) },
        transports: [
            new (winston.transports.File)({ filename: _fn, level: 'warn' })
        ]
    });
}

const error = (dir) => {
    const _fn = getFileName(dir, 'error');
    return winston.createLogger({
        levels: {
            error: 3
        },
        format: getFormat(),
        defaultMeta: { IST: getTimestamp(1) },
        transports: [
            new (winston.transports.File)({ filename: _fn, level: 'error' })
        ]
    });
}

module.exports = {
    debug(msg, dir) {
        debug(dir).debug(msg);
    },
    info(msg, dir) {
        info(dir).info(msg);
    },
    warn(msg, dir) {
        warn(dir).warn(msg);
    },
    error(msg, dir) {
        error(dir).error(msg);
    },
    log(level, msg, dir) {
        const lvl = exports[level];
        lvl(msg, dir);
    }
};