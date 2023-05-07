import * as express from 'express';
import db from '../config';
import { validateJWT } from '../features/base/TreinadorController';


const TreinoRouter = express.Router();

TreinoRouter.post('/', async (req, res) => {
  const { nome_rotina, token_acesso, dias_atribuidos, nome_treino } = req.body;

  if(!(nome_rotina && token_acesso && dias_atribuidos && nome_treino)){
      res.status(400).send("Bad Request");
      return;
  }

  try {
      // Criar o novo exercício usando o Prisma
      const treino = await db.treino.create({
        data: {
          rotina: {
            connect: {
              nome_rotina_token_acesso: {
                nome_rotina: nome_rotina,
                token_acesso: token_acesso,
              },
            },
          },
          aluno: {
            connect: {
              token_acesso: token_acesso,
            },
          },
          dias_atribuidos: dias_atribuidos,
          nome_treino: nome_treino,
        },
      });
  
      // Enviar o exercício criado como resposta à solicitação
      res.status(201).json(treino);
  } catch (error) {
    // Se houver um erro ao criar o exercício, envie uma resposta de erro com código 500
    res.status(500).json({ error: 'Não foi possível criar o exercício' });
    console.log(error);
  }

});

TreinoRouter.get('/',validateJWT, async (req, res) => {
    db.$connect();

    const treinador = req.body.user;


    const treinos = await db.treino.findMany({
        where: {
          aluno: {
            professor_usuario: {
              usuario: treinador
            }
          }
        }
      });

    db.$disconnect();

    res.send(treinos);
});

TreinoRouter.get('/:tokenAcessoAluno/',validateJWT, async (req, res) => {
  db.$connect();

  const treinador = req.body.user;


  const treinos = await db.treino.findMany({
      where: {
        aluno: {
          professor_usuario: {
            usuario: treinador
          },
          token_acesso: req.params.tokenAcessoAluno
        }
      }
    });

  db.$disconnect();

  res.send(treinos);
});


TreinoRouter.get('/:tokenAcessoAluno/:nomeRotina',validateJWT, async (req, res) => {
  db.$connect();

  const treinador = req.body.user;


  const treinos = await db.treino.findMany({
      where: {
        aluno: {
          professor_usuario: {
            usuario: treinador
          },
          token_acesso: req.params.tokenAcessoAluno
        },
        nome_rotina: req.params.nomeRotina

      }
    });

  db.$disconnect();

  res.send(treinos);
});

TreinoRouter.get('/:tokenAcessoAluno/:nomeRotina/:nomeTreino',validateJWT, async (req, res) => {
  db.$connect();

  const treinador = req.body.user;


  const treinos = await db.treino.findMany({
      where: {
        aluno: {
          professor_usuario: {
            usuario: treinador
          },
          token_acesso: req.params.tokenAcessoAluno
        },
        nome_rotina: req.params.nomeRotina,
        nome_treino: req.params.nomeTreino

      }
    });

  db.$disconnect();

  res.send(treinos);
});

TreinoRouter.patch('/', async (req, res) => {
  const {dias_atribuidos, nome_treino, id_treino } = req.body;

  if(!(dias_atribuidos && nome_treino && id_treino)){
      res.status(400).send("Bad Request");
      return;
  }

  try {
      const treino = await db.treino.update({
        where: {
          id_treino: id_treino,
        },
        data: {
          dias_atribuidos: dias_atribuidos,
          nome_treino: nome_treino,
        },
      });

      res.status(201).json(treino);

  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o exercício' });
    console.log(error);
  }

});

TreinoRouter.delete('/', async (req, res) => {
  const {id_treino } = req.body;

  if(!(id_treino)){
      res.status(400).send("Bad Request");
      return;
  }

  try {
      const treino = await db.treino.delete({
        where: {
          id_treino: id_treino,
        },
      });

      res.status(201).json(treino);

  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o exercício' });
    console.log(error);
  }

});









export default TreinoRouter;