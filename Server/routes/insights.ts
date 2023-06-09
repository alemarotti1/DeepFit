import * as express from "express";
import HeartRateInsightController from "../features/insights/heart_rate_insight/HeartRateInsightController";
import { validateJWT } from "../features/base/TreinadorController";
import db from "../config";


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


InsightsRouter.post('/load/', async function(req : any, res : any) {
  const token_relogio = req.body.token_relogio||"0";
  const token_aluno = req.body.token_aluno||"0";

  if (token_aluno == "0") {
    res.status(400).send("Aluno não informado");
    return;
  }

  if (token_relogio == "0") {
    res.status(400).send("Relógio não autorizado");
    return;
  }

  db.$connect();

  //check if aluno exists

  const aluno = await db.aluno.findFirst({
    where: {
      token_acesso: token_aluno
    }
  });

  if (!aluno) {
    res.status(403).send("Não autorizado");
    return;
  }


  //get data from the api
  const heart_rate_data = await HeartRateInsightController.loadAllInsights(token_aluno, token_relogio);
  
  //save data to the database

  for(let day in heart_rate_data) {
    const heart_rate_day = heart_rate_data[day];
    let day_date : string = day;
    
    //check if the data for this day already exists
    const heart_rate_day_db = await db.heart_data.findFirst({
      where: {
        token_acesso: token_aluno,
        data_coleta: day_date
      }
    });

    try{
      if (heart_rate_day_db) {
        //update the data
        await db.heart_data.update({
          where: {
            token_acesso_data_coleta: {
              token_acesso: token_aluno,
              data_coleta: day_date
            }
          },
          data: {
            bpm: parseInt(heart_rate_day),
          }
        });
      } else {
        //create the data
        await db.heart_data.create({
          data: {
            data_coleta: day_date,
            aluno: {
              connect: {
                token_acesso: token_aluno
              }
            },
            bpm: parseInt(heart_rate_day),
          }
        });
      }
    }catch(err){
      console.log(err);
      res.status(500).send("Erro ao salvar dados");
      return;
    }


  }
  db.$disconnect();
  res.send(heart_rate_data);
});


InsightsRouter.get('/load/basal/:numeroAluno', validateJWT, async function(req : any, res : any) {
  const token_aluno = req.params.numeroAluno;

  if (token_aluno == "0") {
    res.status(400).send("Aluno não informado");
    return;
  }

  db.$connect();
  let data : any = null;
  try{
    data = await db.aluno.findMany({
      where:{
        AND: [
          {
            token_acesso: token_aluno,
            treinador_usuario: req.body.user,
          }
        ],
      },
      include: {
        heart_data: true
      }
    });
    res.send(data);
  }catch(err){
    console.log(err);
    res.status(500).send("Erro ao carregar dados");
    return;
  }
  db.$disconnect();

  

});
  
export default InsightsRouter;
