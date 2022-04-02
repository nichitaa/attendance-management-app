import { config } from 'dotenv';
import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import { SuccessResponse } from '../../server-response-middleware/success-response';
import { AttendanceModel } from './attendance.model';
import { UserModel } from '../user/user.model';
import { ErrorException } from '../../server-response-middleware/error-exception';

config();

export class AttendanceController {
  public constructor() {}

  public getAllAttendances = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const attendances = await AttendanceModel.findAll({
      raw: true,
      nest: true,
      include: [{ all: true }],
    });
    return next(new SuccessResponse({ data: attendances }));
  };

  public getAttendanceByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    const { from, to } = req.query;

    const user = await UserModel.findByPk(id as string, { raw: true });

    if (!user)
      throw new ErrorException(
        404,
        `User with id ${id} does not exists in database!`
      );

    let whereQuery: { [k: string]: any } = {
      userId: user.id,
    };

    if (from && to) {
      whereQuery.createdAt = {
        [Op.between]: [new Date(from as string), new Date(to as string)],
      };
    }

    const attendances = await AttendanceModel.findAll({
      raw: true,
      nest: true,
      where: whereQuery,
      include: [{ all: true }],
    });
    return next(new SuccessResponse({ data: attendances }));
  };

  public recordRegisteredTime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    let { fingerprintId } = req.body;
    fingerprintId = parseInt(fingerprintId);

    const user = await UserModel.findOne({ where: { fingerprintId } });

    if (!user) {
      throw new ErrorException(
        404,
        `User with fingerprint ${fingerprintId} was not found in database!`
      );
    }

    const userId = user.id;

    /** If already registered once */
    let query = {
      [Op.and]: {
        userId,
        startTime: {
          [Op.not]: null,
        },
        endTime: {
          [Op.is]: null,
        },
      },
    };
    const prevAttendanceRecord = await AttendanceModel.findOne({
      where: query,
    });

    if (prevAttendanceRecord) {
      const startTime = new Date(prevAttendanceRecord.startTime);
      const endTime = new Date();
      const totalRegisteredTime = endTime.getTime() - startTime.getTime();
      console.log({ totalRegisteredTime });
      await prevAttendanceRecord.update({ endTime, totalRegisteredTime });
      await prevAttendanceRecord.save();
      return next(
        new SuccessResponse({
          message: `Total registered time: ${totalRegisteredTime} for userId: ${userId}`,
        })
      );
    }

    /** First time registration */
    const attendanceRecord = await AttendanceModel.create(
      { userId, startTime: new Date() },
      { raw: true }
    );

    return next(
      new SuccessResponse({
        message: `Created attendance record for userId: ${userId}`,
        data: attendanceRecord,
      })
    );
  };
}
