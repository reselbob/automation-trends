'use strict'
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports.getExchangeData = function getExchangeData(exchange){
    let filespec;
    const dir = process.cwd();
    if(exchange && exchange.toUpperCase() === 'NASDAQ'){
        filespec = path.join(dir, '/data/nasdaq.json');
    }

    if(exchange && exchange.toUpperCase() === 'NYSE'){
        filespec = path.join(dir, '/data/nyse.json');
    }
    let json
    if(_.isString(filespec)){
        const contents = fs.readFileSync(filespec);
        json = JSON.parse(contents);
    }
    return json;
}