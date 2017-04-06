'use strict';

let config = {
    whiteIps: ['::1', '127.0.0.1'],
    httpCode: {
        success: {code: 200, message: 'accept data successfully, please wait 3 minutes.'},
        noPermission: {code: 5001, message: 'Sorry, you have no permission!'},
        error: {code: 5002, message: 'Sorry, something error, please request again some minutes later.'},
        warnRequestBody: {code: 5003, message: 'The data in request\'s body cannot be empty.'},
        warnDataProperty: {code: 5004, message: 'Sorry, the data is illegal.'},
        warnNameProperty: {code: 5005, message: 'Sorry, the image\'s name is illegal.'}
    }
};


exports.config = config;