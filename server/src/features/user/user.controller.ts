import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { UserCreationAttributes, UserModel } from './user.model';
import { SuccessResponse } from '../../server-response-middleware/success-response';


config();

export class UserController {
  public constructor() {
  }

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const users = await UserModel.findAll({ raw: true, nest: true, include: [{ all: true }] });
    return next(new SuccessResponse({ data: users }));
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { body } = req;
    const user = await UserModel.create({ ...body as UserCreationAttributes }, { raw: true });
    return next(new SuccessResponse({ data: user }));
  };

  public getByPk = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = await UserModel.findByPk(req.params.id, { rejectOnEmpty: true, include: [{ all: true }] });
    const department = await user.getDepartment({ raw: true });
    console.log({ department });
    return next(new SuccessResponse({ data: user }));
  };
}
