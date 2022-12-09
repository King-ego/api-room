import express, { Request, Response } from 'express';
import cors from 'cors'
import { AppDataSource } from './data-source';
import routers from './routes';

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
      app.use(cors());
      next();
    });

    app.use('/api', routers);

    return app.listen(process.env.PORT, () => {
      console.log(`Serve running in port:${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
