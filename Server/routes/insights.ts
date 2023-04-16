import express from "express";
import HeartRateInsightController from "../features/insights/heart_rate_insight/HeartRateInsightController";


const InsightsRouter = express.Router();


InsightsRouter.get('/', function(req : any, res : any) {
    //TODO IMPLEMENT THIS
  res.send('Under development');
});


InsightsRouter.get('/sleep_insight', function(req : any, res : any) {
    //get the sleep data from the database
    //receive the data from the client: {JWT_token:”token”, token_aluno : “token de acesso do aluno”, date:”dia do insight”}

    console.log(req.body);
    // SleepInsightController.getInsight(req.body.date, req.body.token_aluno, req.body.JWT_token).then(
    //   (required_insight : SleepInsight) => {
    //     res.send({
    //       "title": required_insight,
    //       "description": required_insight.description,
    //       "grade": required_insight.grade,
    //       "sleep_hours": required_insight.sleep_hours
    //   });
    // }).catch((err : any) => {
    //   console.log(err);
    //   res.send(err);
    // });

});

InsightsRouter.get('/heart_rate_insight/:numeroAluno', function(req : any, res : any) {
  //get the heart rate data from the database
  const token_relogio = req.body.token_relogio||"0";
  const numero_aluno = req.params.numeroAluno;

  HeartRateInsightController.getInsight("0", req.body.usuarioTreinador, numero_aluno, token_relogio).then(
    (required_insight : any) => {
      res.send(required_insight);
  });

});

  
export default InsightsRouter;
