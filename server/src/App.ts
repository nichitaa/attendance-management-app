import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { routes } from './routes/routes';
import sequelize from './sqlz';
import serverResponseMiddleware from './server-response-middleware/server-response.middleware';
import { dataImport } from './resources/data-import';

config();

export class App {
  private readonly app: express.Express;

  public constructor() {
    this.app = express();
    this.bootstrap();
  }

  public listen = async (opts?: { forceSync: boolean }) => {
    const PORT = 8080;
    try {
      await sequelize.authenticate();

      if (opts?.forceSync) {
        await this.forceDBSync();
        await this.importInitialData();
      }

      await this.app.listen(PORT);
      console.log(`time-tracking-system API running on PORT: ${PORT}`);
    } catch (e: any) {
      console.error('Error: ', e.message);
    }
  };

  private bootstrap = () => {
    this.initAppMiddlewares();
    this.initAppRoutes();
  };

  private forceDBSync = async () => {
    await sequelize.sync({ force: true });
    console.log(`SEQUELIZE force synced database!`);
  };

  private importInitialData = async () => {
    await dataImport();
  };

  private initAppMiddlewares = () => {
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  private initAppRoutes = () => {
    this.app.get('/health-check', (req, res) => {
      res.json({ isSuccess: true });
    });
    routes.forEach((route) => this.app.use(route.Router));
    /** Server response handler middleware */
    this.app.use(serverResponseMiddleware);
  };
}
