const express = require('express');
const router = express.Router();
// const { sqlExplorer } = require('../controllers/sqlExplorer');
const {BigQuery} = require('@google-cloud/bigquery');
const bigqueryClient = new BigQuery({
    projectId: process.env.projectId,
});


const convertQuery = (dataset,query) => {
    let transformed_query = ''
    if(query.match("from about")){
        transformed_query = query.replace("about", `${dataset}.about`)
        console.log(transformed_query)
    }

    if(query.match("from education")){
        transformed_query = query.replace("education", `${dataset}.education`)
    }

    if(query.match("from licenses")){
        transformed_query = query.replace("licenses", `${dataset}.licenses`)
    }

    if(query.match("from work_experience")){
        transformed_query = query.replace("work_experience", `${dataset}.work_experience`)
    }

    return transformed_query;
}

router.get('/', async(req,res)=>{
    const dataset = 'portfolio';         
    const { query } = req.body;
    const sqlQuery = convertQuery(dataset,query);
    
    const options = {
        query: sqlQuery
    }

    // Run the query
    const [rows] = await bigqueryClient.query(options);
    res.send(rows)
});

module.exports = router;