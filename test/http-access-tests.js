'use strict';
const encodingHelper = require('../library/encodingHelper');
const intrinioHelper = require('../library/intrinioHelper');
const dataHelper = require('../library/dataHelper');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const app = require('../index');
const fs = require('fs');


describe('Intrinio Access Tests', function () {
    this.timeout(10000);
    it('Can get data from Intrinio Helper', done => {
        intrinioHelper.getData('data_point?ticker=FB&item=employees')
            .then(result => {
                expect(result).to.be.an('object');
                done();
            });
    });

    it('Can get data from dataHelper', done => {
        let data = dataHelper.getExchangeDataSync();
        expect(data).to.be.an('array');
        done();
    });

    it('Can get sectors from dataHelper', done => {
        let data = dataHelper.getSectorsSync();
        expect(data).to.be.an('array');
        done();
    });

    it('Can get tickers by sector from dataHelper', done => {
        const sectors = dataHelper.getSectorsSync();
        sectors.forEach(sector => {
            const result = dataHelper.getTickersBySectorSync(sector)
            expect(result).to.be.an('array');
            console.log(JSON.stringify({sector: sector, count: result.length}))
        })
        done();
    });

    // it('Can get revenue per employee per Sector', done => {
    //     const sectors = dataHelper.getSectorsSync();
    //     sectors.forEach(sector => {
    //         dataHelper.getPerEmployeeRevenueByTickerForSector(sector)
    //             .then(result => {
    //                 expect(result).to.be.an('array');
    //                 done();
    //             });
    //     });
    //
    // });

    it('Can get revenue per employee per Transportation', done => {
        dataHelper.getPerEmployeeRevenueByTickerForSector('Transportation')
            .then(result => {
                expect(result).to.be.an('array');
                console.log(result);
                const fileSpec = '/xxx/xxxx/Documents/holds/saved-data';
                fs.writeFile(fileSpec, JSON.stringify(result), function (err) {
                    if (err) {
                        return console.log(err);
                    };
                    done();
                });

            });
    });
});

