import * as express from 'express';
import db from '../config';
import { validateJWT } from '../features/base/TreinadorController';


const AlunoRouter = express.Router();

AlunoRouter.post('/', validateJWT, async (req, res) => {
    const { nome, nascimento, objetivo, user } = req.body;

    let birth :string | null = nascimento ? nascimento : null;
            if (birth) {
                let birth_split = birth.includes('/') ? birth.split('/') : birth.split('-'); 
                birth = new Date(parseInt(birth_split[2]), parseInt(birth_split[1])-1, parseInt(birth_split[0])).toISOString();
            }
  
    try {
      // Cria um novo registro de aluno no banco de dados
      const novoAluno = await db.aluno.create({
        data: {
          nome: nome,
          nascimento: birth,
          objetivo: objetivo,
          treinador_usuario: user,
        },
      });
  
      // Retorna o novo registro de aluno criado
      return res.status(201).send(novoAluno);
    } catch (error) {
      // Se ocorrer um erro, retorna um erro 500
      console.error(error);
      return res.status(500).send('Erro ao criar o aluno');
    }
  });
  

AlunoRouter.get('/',validateJWT, async (req : express.Request, res : express.Response) => {
    db.$connect();

    const trainer_id = req.body.user;
    console.log("trainerid: "+trainer_id);
    const alunos = await db.aluno.findMany({
        where: {
            treinador_usuario: trainer_id
        }
    });

    db.$disconnect();

    res.send(alunos);
});

AlunoRouter.get('/:tokenAcesso',validateJWT, async (req : express.Request, res : express.Response) => {
    db.$connect();

    const aluno = await db.aluno.findFirst({
        where: {
            token_acesso: req.params.tokenAcesso
        }
    });

    db.$disconnect();

    res.send(aluno);
});

AlunoRouter.put('/', validateJWT, async (req : express.Request, res : express.Response) => {
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

AlunoRouter.delete('/:tokenAcesso', validateJWT, async (req : express.Request, res : express.Response) => {
    try{
        db.$connect();

        let aluno = await db.aluno.delete({
            where: {
                token_acesso: req.params.tokenAcesso
            }
        });

        res.send(aluno);    
        db.$disconnect();
    }catch(err){
        res.status(500).send('Internal Server Error');
        console.log(err);
        db.$disconnect();
    }

});



export default AlunoRouter;
