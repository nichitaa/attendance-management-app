import { AppRouter } from '../../routes/routes';
import { Router } from 'express';
import { DepartmentController } from './department.controller';
import asyncErrorHandler from 'express-async-handler';


export class DepartmentRouter implements AppRouter {

  private readonly router: Router;

  public constructor(private controller: DepartmentController) {
    this.router = Router();
    this.initRoutes();
  }

  public get Router(): Router {
    return this.router;
  }

  private initRoutes = (): void => {
    this.router.route('/department')
      .get(asyncErrorHandler(this.controller.getAll))
      .post(asyncErrorHandler(this.controller.create));
  };

}