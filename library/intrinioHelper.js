'use strict';
const encoder = require('./encodingHelper');
const requestPromise = require('request-promise');
const config = require('../config');

function getHttpOptions(method, uri) {
    const options = {
        method: method,
        uri: uri,
        headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'gzip',
            Authorization: encoder.getEncodedAuthentication()
        },
        json: true,
        gzip: true,
        simple: false,
        resolveWithFullResponse: true
    };
    // options.headers['x-correlation-id'] = uuid.v4();
    return options;
}

module.exports.getData = function getData(endpoint) {
    const point = `${config.intrinioUrl}/${endpoint}`;
    const options = getHttpOptions('GET', point);
    return requestPromise(options)
        .then((response) => {
            return response.body
        })
        .catch(err => {
            console.log(err);
        });
};