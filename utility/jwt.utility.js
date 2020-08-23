
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const sConf = require('../config');

function _JWT() { }

function getPrivateKey(pkey) {
    if (_.isString(pkey) && pkey.length !== 0) {
        return pkey;
    }
    return sConf.JWT_PRIVATE_KEY;

}

_JWT.prototype.sign = (obj, pkey, exp) => {
    pkey = getPrivateKey(pkey);
    if (!exp) {
        exp = 60 * 60 * 24 * 30;
    }
    return jwt.sign(obj, pkey, {
        expiresIn: exp
    })
}

_JWT.prototype.verify = (token, pkey, cb) => {
    pkey = getPrivateKey(pkey);
    if (_.isFunction(cb)) {
        return jwt.verify(token, pkey, (err, decoded) => {
            return cb(err, decoded);
        });
    }
    return new Promise((rs, rj) => {
        jwt.verify(token, pkey, (err, decoded) => {
            if (err) {
                return rj(err);
            }
            return rs(decoded);

        });
    })

}

module.exports = new _JWT();