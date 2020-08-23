const config = require('../config');
const logger = require('../utility/logger.utility');

/**
 * logger module
 */
global.console.logger = logger;

/**
 * debugging module
 */
global.console.log = function Log(...args){
    if (config.DEBUG === 'dev'){
        return require('debug')('dev')(...args);
    }
    return null;
}