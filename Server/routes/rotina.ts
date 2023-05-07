import * as express from 'express';
import db from '../config';
import { validateJWT } from '../features/base/TreinadorController';


const RotinaRouter = express.Router();


RotinaRouter.post('/',validateJWT, async (req, res) => {
    db.$connect();

    if(!(req.body.nome_rotina && req.body.token_acesso)){
        res.status(400).send("Bad Request");
        return;
    }

    let aluno = null;
    try{
        aluno = await db.aluno.findFirst({
            where: {
                token_acesso: req.body.token_acesso,
                treinador_usuario: req.body.user
            }
        });
        if(!aluno) res.status(400).send("Aluno não encontrado");
    }catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err);
        return;
    }

    const rotina = await db.rotina.create({
        data: {
            nome_rotina: req.body.nome_rotina,
            token_acesso: req.body.token_acesso,
        }
    });


    db.$disconnect();

    res.status(201).json(rotina);
});

RotinaRouter.get('/',validateJWT, async (req, res) => {
    db.$connect();

    const trainer_id = req.body.user;

    let alunos = null;
    try{
        alunos = await db.aluno.findMany({
            where: {
                treinador_usuario: trainer_id
            },
            include: {
                rotina: true
            }
        });
    }catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err);
        return;
    }

    db.$disconnect();

    res.send(alunos);
});



RotinaRouter.get('/:tokenAcessoAluno/',validateJWT, async (req, res) => {
    db.$connect();

    const aluno = await db.aluno.findFirst({
        where: {
            token_acesso: req.params.tokenAcessoAluno
        },
        include: {
            rotina: true
        }
    });


    db.$disconnect();

    res.send(aluno?.rotina);
});

RotinaRouter.get('/:tokenAcessoAluno/:nomeRotina',validateJWT, async (req, res) => {
    db.$connect();

    const aluno = await db.aluno.findFirst({
        where: {
            token_acesso: req.params.tokenAcessoAluno
        }
    });

    if(!aluno) {res.status(400).send("Aluno não encontrado"); return;}

    const rotina = await db.rotina.findFirst({
        where: {
            aluno: {
                token_acesso: req.params.tokenAcessoAluno
            },
            nome_rotina: req.params.nomeRotina
        }
    });


    db.$disconnect();

    res.send(rotina);
});

RotinaRouter.delete('/',validateJWT, async (req, res) => {
    db.$connect();

    if(!(req.body.nome_rotina && req.body.token_acesso)){
        res.status(400).send("Bad Request");
        return;
    }

    let aluno = null;
    try{
        aluno = await db.aluno.findFirst({
            where: {
                token_acesso: req.body.token_acesso,
                treinador_usuario: req.body.user
            }
        });
        if(!aluno) res.status(400).send("Aluno não encontrado");

        const rotina = await db.rotina.delete({
            where: {
                nome_rotina_token_acesso: {
                    nome_rotina: req.body.nome_rotina,
                    token_acesso: req.body.token_acesso
                }
            }
        });
        res.status(200).json(rotina);
    
    }catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err);
        return;
    }

    
    
});




export default RotinaRouter;