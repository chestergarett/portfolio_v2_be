const express = require('express');
const router = express.Router();
// const { sqlExplorer } = require('../controllers/sqlExplorer');
const {BigQuery} = require('@google-cloud/bigquery');
const bigqueryClient = new BigQuery({
    projectId: process.env.projectId,
});


const convertToTable = (query) => {

}

router.get('/', async(req,res)=>{
    const dataset = 'portfolio';         
    const {query, tableId} = req.body;
    const sqlQuery = `
        select * 
        from \`${dataset}.${tableId}\`
    `

    const options = {
        query: query
    }

    // Run the query
    const [rows] = await bigqueryClient.query(options);
    res.send(rows)
});

module.exports = router;