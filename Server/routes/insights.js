const express = require('express');
const router = express.Router();
const SleepInsight = require('../features/insights/sleep_insights/sleep_insights');

/* do nothing */
router.get('/', function(req, res) {
    //TODO IMPLEMENT THIS
  res.send('Under development');
});


router.get('/sleep_insight', function(req, res) {
    //get the sleep data from the database
    //receive the data from the client: {JWT_token:”token”, token_aluno : “token de acesso do aluno”, date:”dia do insight”}

    console.log(req.body);
    // const required_insight = new SleepInsight(req.body.date, req.body.token_aluno, req.body.JWT_token);
    // res.send({
    //     "title": required_insight.get_title(),
    //     "description": required_insight.get_description(),
    //     "grade": required_insight.get_grade(),
    //     "sleep_hours": required_insight.get_sleep_hours()
    // });

});
  
module.exports = router;
