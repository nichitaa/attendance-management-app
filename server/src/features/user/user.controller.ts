import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { UserCreationAttributes, UserModel, UserRoles } from './user.model';
import { SuccessResponse } from '../../server-response-middleware/success-response';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ErrorException } from '../../server-response-middleware/error-exception';
import JwtConfig from '../../config/jwt.config';
import {
  createRefreshToken,
  verifyTokenExpiration,
} from '../../utiils/refresh-token.utils';
import { RefreshTokenModel } from './refresh-token.model';
import jwtConfig from '../../config/jwt.config';

config();

export class UserController {
  public constructor() {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const users = await UserModel.findAll({
      raw: true,
      nest: true,
      include: [{ all: true }],
    });
    return next(new SuccessResponse({ data: users }));
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { body } = req;
    if (!body.password) throw new ErrorException(400, 'Password is required!');

    const userWithoutFingerprint = await UserModel.findOne({
      where: { fingerprintId: null },
    });

    if (userWithoutFingerprint)
      throw new ErrorException(
        400,
        `Please add a fingerprint for user: ${userWithoutFingerprint.id} - ${userWithoutFingerprint.email} before enrolling a new user!`
      );

    const userDTO: UserCreationAttributes = {
      ...body,
      password: bcrypt.hashSync(body.password, 8),
    };

    console.log({ userDTO });

    const user = await UserModel.create(userDTO, { raw: true });

    return next(new SuccessResponse({ data: user }));
  };

  public addFingerprintForLastUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { fingerprintId, fingerprintTemplate } = req.body;

    if (!fingerprintId || !fingerprintTemplate)
      throw new ErrorException(
        400,
        `No fingerprintId or fingerprintTemplate was registered!`
      );

    const userWithSameFingerprintId = await UserModel.findOne({
      where: { fingerprintId },
    });

    if (userWithSameFingerprintId) {
      throw new ErrorException(
        400,
        `User with fingerprint id ${fingerprintId} is already registered!`
      );
    }

    const userWithoutFingerprint = await UserModel.findOne({
      where: { fingerprintId: null },
    });

    if (!userWithoutFingerprint)
      throw new ErrorException(
        400,
        `All current enrolled users has registered fingerprints!`
      );

    await userWithoutFingerprint!.update({
      fingerprintId,
      fingerprintTemplate,
    });
    await userWithoutFingerprint!.save();

    return next(
      new SuccessResponse({
        message: `Successfully added fingerprintId and fingerprintTemplate for user: ${
          userWithoutFingerprint!.id
        }`,
      })
    );
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const user = await UserModel.findOne({
      where: { email: req.body.email },
      raw: true,
    });
    if (!user)
      throw new ErrorException(
        404,
        `User with email: ${req.body.email} was not found!`
      );

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) throw new ErrorException(403, `Invalid password!`);

    const token = jwt.sign({ id: user.id, role: user.role }, JwtConfig.secret, {
      expiresIn: JwtConfig.jwtExpiration,
    });
    const refreshToken = await createRefreshToken(user);
    const response = {
      id: user.id,
      email: user.email,
      role: user.role,
      fingerprintId: user.fingerprintId,
      accessToken: token,
      refreshToken: refreshToken,
    };

    return next(
      new SuccessResponse({
        message: 'Login successfully',
        data: response,
      })
    );
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
      throw new ErrorException(403, 'Refresh token is required!');
    }
    const refreshToken = await RefreshTokenModel.findOne({
      where: { token: requestToken },
    });
    if (!refreshToken) {
      throw new ErrorException(403, 'Refresh token is not in database!');
    }

    if (verifyTokenExpiration(refreshToken)) {
      await refreshToken.destroy();
      throw new ErrorException(
        403,
        'Refresh token expired please login again!'
      );
    }

    const user = await UserModel.findByPk(refreshToken.userId);

    if (!user) throw new ErrorException(404, `User was not found in database`);

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.jwtExpiration,
      }
    );
    const response = {
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
      refreshToken: refreshToken.token,
    };

    next(
      new SuccessResponse({
        message: 'Access token successfully regenerated!',
        data: response,
      })
    );
  };

  public getByPk = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const user = await UserModel.findByPk(req.params.id, {
      rejectOnEmpty: true,
      include: [{ all: true }],
    });
    const department = await user.getDepartment({ raw: true });
    console.log({ department });
    return next(new SuccessResponse({ data: user }));
  };
}
