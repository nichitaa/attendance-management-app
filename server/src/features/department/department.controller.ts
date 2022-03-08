import { config } from 'dotenv';
import { DepartmentModel } from './department.model';
import { NextFunction, Request, Response } from 'express';
import { SuccessResponse } from '../../server-response-middleware/success-response';


config();

export class DepartmentController {
  public constructor() {
  }

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const departments = await DepartmentModel.findAll({ raw: true, nest: true, include: [{ all: true }] });
    return next(new SuccessResponse({ data: departments }));
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { name } = req.body;
    const department = await DepartmentModel.create({ name }, { raw: true });
    return next(new SuccessResponse({ data: department }));
  };
}
