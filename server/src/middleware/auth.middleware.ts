import { NextFunction, Request, Response } from 'express';
import { ErrorException } from '../server-response-middleware/error-exception';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';
import { TokenExpiredError } from 'jsonwebtoken';

export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let bearerHeader = req.headers['authorization'];
  let token = '';
  console.log({ bearerHeader });
  if (!bearerHeader) {
    throw new ErrorException(403, 'No token was provided!');
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  token = bearerToken;

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    // @ts-ignore
    const userId = decoded.id;

    req.userId = userId;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new ErrorException(401, 'Access token has expired!');
    }
    throw new ErrorException(401, err.message);
  }
};
