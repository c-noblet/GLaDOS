import express, { Request, Response} from 'express';
import bodyParser from 'body-parser';
import env from '../env.json';

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();

app.get('/glados', async (req, res, next) => {
  res.send('response');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('test');
});

export default app;