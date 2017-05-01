'use strict';
const encodingHelper = require('../library/encodingHelper');
const intrinioHelper = require('../library/intrinioHelper');
const chai = require('chai');
chai.should();
const expect = require('chai').expect;
const app = require('../index');


describe('Intrinio Access Tests', function () {
    this.timeout(10000);
    it('Can get data from Intrinio Helper', done => {
        intrinioHelper.getData('data_point?ticker=FB&item=employees')
            .then(result => {
                expect(result).to.be.an('object');
                done();
            });
    });
});