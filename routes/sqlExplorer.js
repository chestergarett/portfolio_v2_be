const express = require('express');
const router = express.Router();
// const { sqlExplorer } = require('../controllers/sqlExplorer');
const {BigQuery} = require('@google-cloud/bigquery');
const bigqueryClient = new BigQuery({
    projectId: process.env.projectId,
});


const convertQuery = (dataset,query) => {
    let transformed_query = '';

    if(query.match("from about")){
        transformed_query = query.replace("about", `${dataset}.about`)
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

router.post('/query', async(req,res)=>{
    const dataset = 'portfolio';         
    const { query } = req.body;
    const sqlQuery = convertQuery(dataset,query.toLowerCase());
    
    const options = {
        query: sqlQuery
    }

    // Run the query
    const [rows] = await bigqueryClient.query(options);
    res.status(200).send(rows)
});

router.get('/tables', async(req,res)=> {
    const [portfolio] = await bigqueryClient.dataset('portfolio').getTables();
    let data = [];
    
    portfolio.forEach(table => data.push(table.id))
    res.status(200).send({ portfolio: data })
})

module.exports = router;