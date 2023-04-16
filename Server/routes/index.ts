import * as express from 'express';

const IndexRouter = express.Router();

/* do nothing */
IndexRouter.get('/', function(req : any, res : any) {
  res.send('');
});

export default IndexRouter;