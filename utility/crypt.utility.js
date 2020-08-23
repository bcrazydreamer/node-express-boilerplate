const bcrypt = require('bcryptjs');
const _ = require('lodash');

const salt_val = 10;
function Crypt() { }

Crypt.prototype.encode = (password, cb) => {
    if (_.isFunction(cb)) {
        return bcrypt.genSalt(salt_val, (err, salt) => {
            if (err) { return cb(err) }
            return bcrypt.hash(password, salt, (bcr_err, hash) => {
                return cb(bcr_err, hash);
            });
        });
    }
    const salt = bcrypt.genSaltSync(salt_val);
    return bcrypt.hashSync(password, salt);
};

Crypt.prototype.decode = (password, hash, cb) => {
    if (_.isFunction(cb)) {
        return bcrypt.compare(password, hash, (err, res) => {
            return cb(err, res);
        });
    }
    return bcrypt.compareSync(password, hash);
}

module.exports = new Crypt();