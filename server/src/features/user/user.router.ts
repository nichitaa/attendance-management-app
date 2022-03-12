import { AppRouter } from '../../routes/routes';
import { Router } from 'express';
import asyncErrorHandler from 'express-async-handler';
import { UserController } from './user.controller';
import { verifyJwtToken } from '../../middleware/auth.middleware';

export class UserRouter implements AppRouter {
  private readonly router: Router;

  public constructor(private controller: UserController) {
    this.router = Router();
    this.initRoutes();
  }

  public get Router(): Router {
    return this.router;
  }

  private initRoutes = (): void => {
    this.router
      .route('/user')
      .get(
        asyncErrorHandler(verifyJwtToken),
        asyncErrorHandler(this.controller.getAll)
      )
      .post(asyncErrorHandler(this.controller.create));

    this.router
      .route('/user/:id')
      .get(
        asyncErrorHandler(verifyJwtToken),
        asyncErrorHandler(this.controller.getByPk)
      );

    this.router
      .route('/auth/login')
      .post(asyncErrorHandler(this.controller.login));

    this.router
      .route('/auth/refresh-token')
      .post(asyncErrorHandler(this.controller.refreshToken));
  };
}
