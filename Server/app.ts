import express, { json, NextFunction, Request, Response, Router, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();



import TreinadorRouter from './routes/treinador';
import InsightsRouter from './routes/insights';
import AlunoRouter from './routes/aluno';

import AuthRouter from './routes/auth';
import IndexRouter from './routes';
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json());
app.use(cors());
app.use( cookieParser() );
app.get('/', (req : Request, res : Response) => {
    res.send('Hello World!');
  });


//defining the standard routes
app.use('/', IndexRouter);
app.use('/auth', AuthRouter);
app.use('/insights', InsightsRouter);
app.use('/treinador', TreinadorRouter);
app.use('/aluno', AlunoRouter);



const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


module.exports = app;
export default app;