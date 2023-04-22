import * as express from 'express';
import * as bcrypt from 'bcrypt';
import db, { hashNumber, secret_key } from '../config';
import * as jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import TreinadorController from '../features/base/TreinadorController';




const AuthRouter = express.Router();

AuthRouter.get('/', function(req : express.Request, res : express.Response) {
    //cannot GET
    res.status(301).send('Cannot GET');
  
});

AuthRouter.post('/', async (req : express.Request, res : express.Response) => {
  try{
      if (!req.body.usuario || !req.body.senha) {
          res.status(400).send('Bad Request');
          console.log(req.body);
          return;
      }
      await TreinadorController.login(req.body.usuario, req.body.senha).then((result) => {
        if(!result) {res.status(401).send('Unauthorized'); return;}
        
        res.cookie('token', result, { httpOnly: true });
        res.status(200).send('Logged in');
        
      }).catch((err) => {
        res.status(500).send('Internal Server Error');
      });
      
  } catch(err) {
      res.status(500).send('Internal Server Error');
      console.log(err);
  }
});

AuthRouter.put('/', async (req :any, res :any) => {
    //check if user exists
    //if exists, update, except for password
    //if not, create
    try{
      db.$connect();

      
      if(!req.body.usuario){
        console.log(req);
        res.status(400).send('Bad Request');
        return;
      }
      let user = await db.treinador.findUnique({
          where: {
            usuario: req.body.usuario
          }
      });

      if(user) {
        db.treinador.update({
          where: {
            usuario: req.body.usuario
          },
          data: {
            nome: req.body.nome ? req.body.nome : user.nome,
            email: req.body.email ? req.body.email : user.email,
            CREF: req.body.CREF ? req.body.CREF : user.CREF,
            usuario: req.body.usuario,
          }
        });
        res.status(200).send('Updated');
      } else {
        db.treinador.createMany({
          data: [{
            nome: req.body.nome ? req.body.nome : null,
            email: req.body.email ? req.body.email : null,
            CREF: req.body.CREF ? req.body.CREF : null,
            usuario: req.body.usuario,
            senha: bcrypt.hashSync(req.body.senha, hashNumber),
          }]
        }).then(() => {
          res.status(200).send('Updated');
        }).catch((err) => {
          res.status(500).send('Internal Server Error');
          console.log(err);
        });
      }
    
      
    } catch(err) {
      res.status(500).send('Internal Server Error');
      console.log(err);
    }
});




export default AuthRouter;
