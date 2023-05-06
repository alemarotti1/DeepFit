import * as express from 'express';
import db from '../config';
import { validateJWT } from '../features/base/TreinadorController';


const ExercicioRouter = express.Router();

ExercicioRouter.post('/', async (req: express.Request, res: express.Response) => {
    // Extrair as informações do corpo da solicitação
    const { nome, tipo, grupo_muscular, conjunto_serie, user } = req.body;
  
    try {
      // Criar o novo exercício usando o Prisma
      const exercicio = await db.exercicio.create({
        data: {
          nome: nome,
          tipo: tipo,
          grupo_muscular: grupo_muscular,
          conjunto_serie: conjunto_serie,
          Treinador_usuario: user
        },
      });
  
      // Enviar o exercício criado como resposta à solicitação
      res.status(201).json(exercicio);
    } catch (error) {
      // Se houver um erro ao criar o exercício, envie uma resposta de erro com código 500
      res.status(500).json({ error: 'Não foi possível criar o exercício' });
    }
  });
  
ExercicioRouter.get('/',validateJWT, async (req: express.Request, res: express.Response) => {
    db.$connect();
//todos os exercicios daquele treinador
    const trainer_id = req.body.user;
    console.log("trainerid: "+trainer_id);
    const exercicios = await db.exercicio.findMany({
        where: {
            Treinador_usuario: trainer_id
        }
    });

    db.$disconnect();

    res.send(exercicios);
});

ExercicioRouter.put('/', validateJWT, async (req: express.Request, res: express.Response) => {
    try{
        db.$connect();

        if(req.body.nome){
            let exercicio = db.exercicio.findFirst({
                where: {
                    nome: req.body.nome
                    //nome do exercicio for o mesmo do pedido
                }
            });
            if(!exercicio) res.status(400).send("Exercicio não encontrado");
            else{
                let id_exercicio : number =  req.body.id_exercicio;
                let exercicio = await db.exercicio.update({
                    where: {
                        id_exercicio: id_exercicio
                    },
                    data: {
                        nome: req.body.nome,
                        tipo: req.body.tipo,
                        grupo_muscular: req.body.grupo_muscular,
                        treinador: req.body.treinador,
                    }
                });
                res.send(exercicio);
            }
        }

    } catch(err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
        db.$disconnect();
    }
});




export default ExercicioRouter;
