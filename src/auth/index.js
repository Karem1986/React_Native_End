import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

export default (app) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: '*' }));
};