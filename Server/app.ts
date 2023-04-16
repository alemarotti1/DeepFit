import express from 'express';

import TreinadorRouter from './routes/treinador';
import InsightsRouter from './routes/insights';
import AlunoRouter from './routes/aluno';

import AuthRouter from './routes/auth';
import IndexRouter from './routes';




const app = express();
app.use(express.json());


//defining the standard routes
app.use('/', IndexRouter);
app.use('/auth', AuthRouter);
app.use('/insights', InsightsRouter);
app.use('/treinador', TreinadorRouter);
app.use('/aluno', AlunoRouter);

module.exports = app;
export default app;