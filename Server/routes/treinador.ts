import * as express from 'express';

const TreinadorRouter = express.Router();

TreinadorRouter.get('/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      // Busca o treinador no banco de dados com o email especificado
      const treinador = await db.treinador.findFirst({
        where: {
          email: email,
        },
        include: {
          aluno: true,
          exercicio: true,
        },
      });
  
      // Se o treinador não for encontrado, retorna um erro 404
      if (!treinador) {
        return res.status(404).send('Treinador não encontrado');
      }
  
      // Retorna o treinador encontrado
      return res.send(treinador);
    } catch (error) {
      // Se ocorrer um erro, retorna um erro 500
      console.error(error);
      return res.status(500).send('Erro ao buscar o treinador');
    }
  });
  

  TreinadorRouter.put('/:usuario', async (req, res) => {
    const { senha, email, CPF, nome, CREF } = req.body;
    const { usuario } = req.params;
  
    try {
      // Verifica se o registro de treinador existe no banco de dados
      const treinadorExistente = await db.treinador.findUnique({
        where: {
          usuario: usuario,
        },
      });
  
      if (!treinadorExistente) {
        return res.status(404).send('Treinador não encontrado');
      }
  
      // Atualiza o registro de treinador existente no banco de dados
      const treinadorAtualizado = await db.treinador.update({
        where: {
          usuario: usuario,
        },
        data: {
          senha: senha || treinadorExistente.senha,
          email: email || treinadorExistente.email,
          CPF: CPF || treinadorExistente.CPF,
          nome: nome || treinadorExistente.nome,
          CREF: CREF || treinadorExistente.CREF,
        },
      });
  
      // Retorna o registro de treinador atualizado
      return res.send(treinadorAtualizado);
    } catch (error) {
      // Se ocorrer um erro, retorna um erro 500
      console.error(error);
      return res.status(500).send('Erro ao atualizar o treinador');
    }
  });
  

export default TreinadorRouter;