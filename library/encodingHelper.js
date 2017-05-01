'use strict';
const config = require('../config');

module.exports.getEncodedAuthentication = function getEncodedAuthentication(){
    return 'Basic ' + new Buffer(config.userName + ':' + config.userPwd).toString('base64');
}