const { errorCodes } = require('../utils/errorCodes');

module.exports = class Common {

    /**
     * Cook json data for error result wuth status code is success
     * 
     * @param {*} res 
     * @param {*} errorCode 
     */
    static errorResult(res, errorCode) {
        let result = {
            'result_code': errorCodes[errorCode].resultCode,
            'message': errorCodes[errorCode].message,
        };
        return res.status(errorCodes[errorCode].statusCode).send(result);
    }
}

