import { NextFunction, Request, Response } from 'express';
import { SuccessResponse } from './success-response';
import { ErrorException } from './error-exception';
import { EmptyResultError, ValidationError } from 'sequelize';

const serverResponseMiddleware = (
  serverResponse: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // server success response
  if (serverResponse instanceof SuccessResponse) {
    return res.status(serverResponse.statusCode).json({
      isSuccess: true,
      message: serverResponse.message,
      data: serverResponse.data,
    });
  }

  // sequelize validation error
  if (serverResponse instanceof ValidationError) {
    return res.status(400).json({
      isSuccess: false,
      error: serverResponse.errors[0].message,
    });
  }

  // sequelize empty result error
  if (serverResponse instanceof EmptyResultError) {
    return res.status(404).json({
      isSuccess: false,
      message: 'No record found!',
    });
  }

  // custom thrown error
  if (serverResponse instanceof ErrorException) {
    return res.status(serverResponse.statusCode).json({
      isSuccess: false,
      error: serverResponse.error,
    });
  }

  console.error(serverResponse)

  return res.status(500).json({
    isSuccess: false,
    instanceOfResponse: typeof serverResponse,
    error: 'unhandled server error/response',
    data: serverResponse,
  });
};

export default serverResponseMiddleware;