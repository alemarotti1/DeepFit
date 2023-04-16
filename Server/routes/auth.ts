import * as express from 'express';

const AuthRouter = express.Router();

/* GET users listing. */
AuthRouter.get('/', function(req : any, res : any) {
  res.send('respond with a resource');
});

export default AuthRouter;
