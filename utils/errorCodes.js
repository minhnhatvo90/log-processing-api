const errorCodes = {
    UNKNOWN_ERROR: {
        resultCode: 3001,
        statusCode: 503,
        message: "Unknown error"
    },
    MISSING_JSON_FILE: {
        resultCode: 3002,
        statusCode: 401,
        message: "Please provide an json file"
    },
    INVALID_JSON_FILE: {
        resultCode: 3003,
        statusCode: 200,
        message: "Please provide an valid log json file"
    },
}
module.exports = { errorCodes };