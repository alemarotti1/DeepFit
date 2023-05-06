import * as express from 'express';
import db from '../config';
import { validateJWT } from '../features/base/TreinadorController';


const TreinoRouter = express.Router();

TreinoRouter.post('/', async (req, res) => {
    const { nome_rotina, tokenAcesso, diasAtribuidos } = req.body;
  
    try {
        // Criar o novo exercício usando o Prisma
        const treino = await prisma.treino.create({
          data: {
            nome_rotina,
            tokenAcesso,
            diasAtribuidos,
          },
        });
    
        // Enviar o exercício criado como resposta à solicitação
        res.status(201).json(treino);
      } catch (error) {
        // Se houver um erro ao criar o exercício, envie uma resposta de erro com código 500
        res.status(500).json({ error: 'Não foi possível criar o exercício' });
      }
    });
TreinoRouter.get('/',validateJWT, async (req, res) => {
    db.$connect();

    const aluno_id = req.body.user;
    const dias_atribuidos = req.body.days;

    dias_atribuidos
    console.log("aluno_id: "+aluno_id);
    const alunos = await db.aluno.findMany({
        where: {
            dias_atribuidos: dias_atribuidos,
            aluno_id:aluno_id
        }
    });

    db.$disconnect();

    res.send(alunos);
});




export default AlunoRouter;