const { errors } = require('../helper');

module.exports = {
    sendError(res, err, code = 500) {
        let _err;
        let _code = code;
        const erob = errors[err];
        if (erob) {
            [_err, _code] = erob;
        }
        return res.status(code).json({
            code: _code,
            message: _err,
            success: false
        });
    },
    sendSuccess(res, data = 200) {
        return res.status(200).json({
            success: true,
            data
        });
    }
};