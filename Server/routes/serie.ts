import * as express from 'express';
import db from '../config';
import { validateJWT } from '../features/base/TreinadorController';



const SerieRouter = express.Router();

SerieRouter.put('/:tokenAcessoAluno/:nomeRotina/:id_treino', validateJWT, async (req, res) => {
    const {id_exercicio, qtd_series, qtd_repeticoes, carga, tempo_descanso} = req.body;

  
    if(!(id_exercicio && qtd_series && qtd_repeticoes && carga && tempo_descanso)){
        res.status(400).send("Bad Request");
        return;
    }
  
    try {
        const conjunto_serie = await db.conjunto_serie.create({
          data: {
            treino: {
              connect: {
                id_treino: parseInt(req.params.id_treino),
              },
            },
            exercicio: {
              connect: {
                id_exercicio: id_exercicio,
              },
            },
            qtd_series: qtd_series,
            qtd_repeticoes: qtd_repeticoes,
            carga: carga,
            tempo_descanso: tempo_descanso,
          },
        });
  
        res.status(201).json(conjunto_serie);
  
    } catch (error) {
      res.status(500).json({ error: 'Não foi possível criar o exercício' });
      console.log(error);
    }
  
});

SerieRouter.get('/:tokenAcessoAluno/:nomeRotina/:nomeTreino', validateJWT, async (req, res) => {
    db.$connect();

    const treinador = req.body.user;

    try{
        const series = await db.conjunto_serie.findMany({
            where: {
                treino: {
                    aluno: {
                        professor_usuario: {
                            usuario: treinador
                        },
                        token_acesso: req.params.tokenAcessoAluno
                    },
                    rotina: {
                        nome_rotina: req.params.nomeRotina
                    },
                }
            } 
        });

        res.status(200).json(series);
    }catch(error){
        res.status(500).json({ error: 'Não foi possível criar o exercício' });
        console.log(error);
    }

    db.$disconnect();
});

SerieRouter.patch('/', validateJWT, async (req, res) => {
    db.$connect();

    const id_exercicio = req.body.id_exercicio ? req.body.id_exercicio : null;
    const id_treino = req.body.id_treino ? req.body.id_treino : null;
    const qtd_series = req.body.qtd_series ? req.body.qtd_series : 0;
    const qtd_repeticoes = req.body.qtd_repeticoes ? req.body.qtd_repeticoes : null;
    const carga = req.body.carga ? req.body.carga : null;
    const tempo_descanso = req.body.tempo_descanso ? req.body.tempo_descanso : null;

    if(!(id_exercicio && id_treino)){
        res.status(400).send("Bad Request");
        return;
    }

    let conjunto_serie = null;
    try {
        conjunto_serie = await db.conjunto_serie.findFirst({
            where: {
                id_exercicio: id_exercicio,
                id_treino: id_treino
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o exercício' });
        console.log(error);
    }

    if(!conjunto_serie) {
        res.status(404).json({ error: 'Não foi possível localizar o exercício' });
        return;
    }

    try {
        conjunto_serie = await db.conjunto_serie.update({
            where: {
                id_exercicio_id_treino: {
                    id_exercicio: id_exercicio,
                    id_treino: id_treino
                }
            },
            data: {
                qtd_series: qtd_series ? qtd_series : conjunto_serie.qtd_series,
                qtd_repeticoes: qtd_repeticoes ? qtd_repeticoes : conjunto_serie.qtd_repeticoes,
                carga: carga ? carga : conjunto_serie.carga,
                tempo_descanso: tempo_descanso ? tempo_descanso : conjunto_serie.tempo_descanso,
            }
        });

        res.status(200).json(conjunto_serie);
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o exercício' });
        console.log(error);
    }

    db.$disconnect();
});

SerieRouter.delete('/', validateJWT, async (req, res) => {
    const id_exercicio = req.body.id_exercicio ? req.body.id_exercicio : null;
    const id_treino = req.body.id_treino ? req.body.id_treino : null;

    db.$connect();

    if(!(id_exercicio && id_treino)){
        res.status(400).send("Bad Request");
        return;
    }

    try{
        const conjunto_serie = await db.conjunto_serie.delete({
            where: {
                id_exercicio_id_treino: {
                    id_exercicio: id_exercicio,
                    id_treino: id_treino
                }
            }
        });

        res.status(200).json(conjunto_serie);

    }catch(error){
        res.status(500).json({ error: 'Não foi possível deletar o exercício' });
        console.log(error);
    }

    db.$disconnect();

});







export default SerieRouter;