import { AppRouter } from '../../routes/routes';
import { Router } from 'express';
import { AttendanceController } from './attendance.controller';
import asyncErrorHandler from 'express-async-handler';
import { verifyJwtToken } from '../../middleware/auth.middleware';

export class AttendanceRouter implements AppRouter {
  private readonly router: Router;

  public constructor(private controller: AttendanceController) {
    this.router = Router();
    this.initRoutes();
  }

  public get Router(): Router {
    return this.router;
  }

  private initRoutes = (): void => {
    this.router
      .route('/attendance')
      .get(
        asyncErrorHandler(verifyJwtToken),
        asyncErrorHandler(this.controller.getAll)
      )
      .post(asyncErrorHandler(this.controller.recordRegisteredTime));
  };
}