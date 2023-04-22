import * as express from 'express';
import * as bcrypt from 'bcrypt';
import db, { hashNumber, secret_key } from '../config';
import * as jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';



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
      let user : string = req.body.usuario;
      let password : string = req.body.senha ? req.body.senha : ``;

      
      db.$connect();

      const trainer = await db.treinador.findUnique({
          where: {
              usuario: user
          }
      });

      
      let password_hashed = trainer?.senha ? trainer.senha : ``;

      let logged : boolean = bcrypt.compareSync(password, password_hashed);
      if(logged && trainer) 
        jwt.sign({
          user: trainer.usuario,
          CREF: trainer.CREF ? trainer.CREF : null,
          nome: trainer.nome ? trainer.nome : null,
          email: trainer.email ? trainer.email : null,
        }, secret_key, (err:any, token:any) => {
          if(err) res.status(500).send('Internal Server Error');
          else {
            res.cookie('token', token, { httpOnly: true });
            res.status(200).send('Logged in');
          }
      });
      else
        res.status(401).send('Unauthorized');
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
