import * as express from 'express';
import db from '../config';
import { validateJWT } from '../features/base/TreinadorController';


const RotinaRouter = express.Router();


RotinaRouter.post('/',validateJWT, async (req, res) => {
    res.send('Hello World!');
});

RotinaRouter.get('/',validateJWT, async (req, res) => {
    db.$connect();

    const trainer_id = req.body.user;
    const token_acesso = req.body.token_acesso;

    let aluno = null;
    try{
        aluno = await db.aluno.findFirst({
            where: {
                token_acesso: token_acesso,
                treinador_usuario: trainer_id
            }
        });
        if(!aluno) res.status(400).send("Aluno não encontrado");
    }catch(err){
        res.status(500).send("Erro ao buscar aluno");
    }

    if(aluno == null) res.status(400).send("Aluno não encontrado");

    const rotinas = await db.rotina.findMany({
        where: {
            aluno: {
                token_acesso: token_acesso
            }
        }
    });


    db.$disconnect();

    res.send(rotinas);
});

RotinaRouter.get('/:tokenAcesso/rotinas/:nomeRotina',validateJWT, async (req, res) => {
    db.$connect();

    const aluno = await db.aluno.findFirst({
        where: {
            token_acesso: req.params.tokenAcesso
        }
    });

    if(!aluno) res.status(400).send("Aluno não encontrado");

    const rotina = await db.rotina.findFirst({
        where: {
            aluno: {
                token_acesso: req.params.tokenAcesso
            },
            nome_rotina: req.params.nomeRotina
        }
    });


    db.$disconnect();

    res.send(rotina);
});

RotinaRouter.put('/', validateJWT, async (req, res) => {
    try{
        db.$connect();

        if(req.body.token_acesso){
            let aluno = db.aluno.findFirst({
                where: {
                    token_acesso: req.body.token_acesso
                }
            });
            if(!aluno) res.status(400).send("Aluno não encontrado");
            else{
                let aluno = await db.aluno.update({
                    where: {
                        token_acesso: req.body.token_acesso
                    },
                    data: {
                        nome: req.body.nome,
                        nascimento: req.body.nascimento,
                        objetivo: req.body.objetivo,
                    }
                });
                res.send(aluno);
            }
        }
        else{
            let birth :string | null = req.body.nascimento ? req.body.nascimento : null;
            if (birth) {
                let birth_split = birth.includes('/') ? birth.split('/') : birth.split('-'); 
                birth = new Date(parseInt(birth_split[2]), parseInt(birth_split[1])-1, parseInt(birth_split[0])).toISOString();
            }
            console.log(birth);
            let aluno = await db.aluno.create({
                data: {
                    nome: req.body.nome ? req.body.nome : null,
                    nascimento: birth,
                    objetivo: req.body.objetivo ? req.body.objetivo : null,
                    professor_usuario: {
                        connect: {
                            usuario: req.body.user
                        }
                    }
                }
            });



            res.send(aluno);
            
        }
    } catch(err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
        db.$disconnect();
    }
});



export default RotinaRouter;