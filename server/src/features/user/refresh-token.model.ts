import { BelongsToGetAssociationMixin, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../sqlz';
import { UserInstance, UserModel } from './user.model';

interface RefreshTokenAttributes {
  id: number;
  userId: number;
  token: string;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}

export interface RefreshTokenInstance extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>, RefreshTokenAttributes {
  getUser: BelongsToGetAssociationMixin<UserInstance>;
}

export const RefreshTokenModel =
  sequelize.define<RefreshTokenInstance>('refresh_token', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: 'id',
      },
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });


/**
 * Relations
 */

RefreshTokenModel.belongsTo(UserModel);
UserModel.hasOne(RefreshTokenModel);