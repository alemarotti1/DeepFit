import * as express from 'express';
import db from '../config';


const AlunoRouter = express.Router();


AlunoRouter.post('/', async (req, res) => {
    
});

AlunoRouter.get('/', async (req, res) => {
    db.$connect();

    const alunos = db.aluno.findMany();

    res.send(alunos);
});

AlunoRouter.put('/', async (req, res) => {
    
});



export default AlunoRouter;