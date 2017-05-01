'use strict'
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');
const intrinioHelper = require('./intrinioHelper');


let exchangeData;

const getExchangeDataSync = module.exports.getExchangeDataSync = function getExchangeDataSync(){
    if (!exchangeData) {
        let filespec;
        const dir = process.cwd();
        filespec = path.join(dir, '/data/nasdaq.json');
        const nasdaq = JSON.parse(fs.readFileSync(filespec));

        nasdaq.forEach(itm => {
            itm.exchange = 'nasdaq'
        });

        filespec = path.join(dir, '/data/nyse.json');
        const nyse = JSON.parse(fs.readFileSync(filespec));
        nyse.forEach(itm => {
            itm.exchange = 'nyse'
        });

        exchangeData =  _.union(nasdaq, nyse);
    }

    return exchangeData
}

module.exports.getSectorsSync = function getSectorsSync(){
    const data = getExchangeDataSync();
    return _
        .chain(data)
        .uniqBy('Sector')
        .map(itm =>{
            return itm.Sector
        })
        .value();

}

const getTickersBySectorSync = module.exports.getTickersBySectorSync = function getTickersBySectorSync(sector){
    const data = getExchangeDataSync();
    return _.filter(data, { 'Sector': sector});

}

module.exports.getPerEmployeeRevenueByTickerForSector = function getPerEmployeeRevenueByTickerForSector(sector){
    const tickers = getTickersBySectorSync(sector);
    //put together the ticker query
    //const dummies = ['AAPL','MSFT', 'GOOG', 'FB'];
    const getters = _.map(tickers, ticker => {
        const endpoint = `data_point?identifier=${ticker.Symbol}&item=employees,totalrevenue`;
        return intrinioHelper.getData(endpoint);
    });
    return Promise.all(getters)
        .then(result => {
            //get the employee count and revenue out by ticker
            const arr = [];
            result.forEach(obj =>{
                const revenue = _.find(obj.data, {item: 'totalrevenue'}).value;
                const ticker = _.find(obj.data, {item: 'totalrevenue'}).identifier;
                const employees = _.find(obj.data, {item: 'employees'}).value;

                const revenuePerEmployee = revenue/employees;
                arr.push({ticker, revenue, employees, revenuePerEmployee})
            })
            return arr;
        })
};
