const dotenv = require('dotenv');

dotenv.config();
const { env } = process;

const conf = {
    // any config
};

module.exports = { ...conf, ...env };