'use strict';
const path = require('path');
const fs = require('fs');
const appRouter = function (app) {
  app.get('/api/trends', function (req, res) {
    res.send({message: 'Hi from API Trends'});
  });

};
module.exports = appRouter;
