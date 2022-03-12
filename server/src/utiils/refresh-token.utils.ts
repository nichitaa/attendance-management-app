import { UserInstance } from '../features/user/user.model';
import {
  RefreshTokenInstance,
  RefreshTokenModel,
} from '../features/user/refresh-token.model';
import JwtConfig from '../config/jwt.config';
import { v4 as uuidv4 } from 'uuid';

export const createRefreshToken = async (user: UserInstance): Promise<string> => {
  const refreshTokenRecord = await RefreshTokenModel.findOne({
    where: { userId: user.id },
  });

  if (refreshTokenRecord) {
    if (verifyTokenExpiration(refreshTokenRecord)) {
      // previous refresh token expired, destroy it and create new one
      await refreshTokenRecord.destroy();
    } else {
      // previous token is still valid
      return refreshTokenRecord.token;
    }
  }

  // create new refresh token
  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + JwtConfig.jwtRefreshExpiration);

  const token = uuidv4();
  const newRefreshTokenRecord = await RefreshTokenModel.create({
    token: token,
    userId: user.id,
    expiryDate: expiredAt,
  });

  return newRefreshTokenRecord.token;
};

export const verifyTokenExpiration = (token: RefreshTokenInstance): boolean => {
  return token.expiryDate.getTime() < new Date().getTime();
};
