import { Model, DataTypes, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../../sqlz';
import { DepartmentInstance, DepartmentModel } from '../department/department.model';

export enum UserRoles {
  ADMIN = 'admin',
  DEPARTMENT_ADMIN = 'department_admin',
  DEFAULT = 'default'
}

interface UserAttributes {
  id: number;
  departmentId: number;
  fingerprintId: number;
  fingerprintTemplate: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
  dateOfBirth: Date;
  PIN: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  getDepartment: BelongsToGetAssociationMixin<DepartmentInstance>;
}

export const UserModel =
  sequelize.define<UserInstance>('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: DepartmentModel,
        key: 'id',
      },
      allowNull: false,
    },
    fingerprintId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fingerprintTemplate: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(UserRoles),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    PIN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

/**
 * Relations definition
 */

/**
 * Department -> User
 * one-to-many
 * One department can have multiple users
 */
DepartmentModel.hasMany(UserModel);
UserModel.belongsTo(DepartmentModel);