import { config } from 'dotenv';
import { DepartmentModel } from './department.model';
import { NextFunction, Request, Response } from 'express';
import { SuccessResponse } from '../../server-response-middleware/success-response';
import { ErrorException } from '../../server-response-middleware/error-exception';

config();

export class DepartmentController {
  public constructor() {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const departments = await DepartmentModel.findAll({
      raw: true,
      nest: true,
      include: [{ all: true }],
    });
    return next(new SuccessResponse({ data: departments }));
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { name } = req.body;
    const department = await DepartmentModel.create({ name }, { raw: true });
    return next(new SuccessResponse({ data: department }));
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    const { name } = req.body;

    const department = await DepartmentModel.findByPk(id);

    if (!department)
      throw new ErrorException(404, `Department ${id} was not found!`);

    await department.update({ name });
    await department.save();

    return next(
      new SuccessResponse({
        message: `Department ${id} was successfully updated!`,
      })
    );
  };
}
