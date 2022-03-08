import { config } from 'dotenv';
import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import { SuccessResponse } from '../../server-response-middleware/success-response';
import { AttendanceModel } from './attendance.model';

config();

export class AttendanceController {
  public constructor() {
  }

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const attendances = await AttendanceModel.findAll({ raw: true, nest: true, include: [{ all: true }] });
    return next(new SuccessResponse({ data: attendances }));
  };

  public recordRegisteredTime = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { userId } = req.body;

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
    const prevAttendanceRecord = await AttendanceModel.findOne({ where: query });

    if (prevAttendanceRecord) {
      const startTime = new Date(prevAttendanceRecord.startTime);
      const endTime = new Date();
      const totalRegisteredTime = endTime.getTime() - startTime.getTime();
      console.log({ totalRegisteredTime });
      await prevAttendanceRecord.update({ endTime, totalRegisteredTime });
      await prevAttendanceRecord.save();
      return next(new SuccessResponse({ message: `Total registered time: ${totalRegisteredTime} for userId: ${userId}` }));
    }

    /** First time registration */
    const attendanceRecord = await AttendanceModel.create({ userId, startTime: new Date() }, { raw: true });

    return next(new SuccessResponse({
      message: `Created attendance record for userId: ${userId}`,
      data: attendanceRecord,
    }));
  };
}
