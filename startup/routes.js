const express = require('express');
const sqlExplorer = require('../routes/sqlExplorer');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/sqlExplorer', sqlExplorer);
}