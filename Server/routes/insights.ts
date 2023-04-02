/* do nothing */
router.get('/', function(req : any, res : any) {
    //TODO IMPLEMENT THIS
  res.send('Under development');
});


router.get('/sleep_insight', function(req : any, res : any) {
    //get the sleep data from the database
    //receive the data from the client: {JWT_token:”token”, token_aluno : “token de acesso do aluno”, date:”dia do insight”}

    console.log(req.body);
    SleepInsightController.getInsight(req.body.date, req.body.token_aluno, req.body.JWT_token).then(
      (required_insight : SleepInsight) => {
        res.send({
          "title": required_insight,
          "description": required_insight.description,
          "grade": required_insight.grade,
          "sleep_hours": required_insight.sleep_hours
      });
    }).catch((err : any) => {
      console.log(err);
      res.send(err);
    });

});
  
module.exports = router;
