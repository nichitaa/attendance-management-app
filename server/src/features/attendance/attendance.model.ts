import { Model, DataTypes, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import { UserInstance, UserModel } from '../user/user.model';
import { DepartmentInstance, DepartmentModel } from '../department/department.model';
import sequelize from '../../sqlz';


interface AttendanceAttributes {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  startTime: Date;
  endTime: Date;
  totalRegisteredTime: number;
}

export interface AttendanceCreationAttributes extends Optional<AttendanceAttributes, 'id' | 'createdAt' | 'updatedAt' | 'endTime' | 'totalRegisteredTime'> {
}

export interface AttendanceInstance extends Model<AttendanceAttributes, AttendanceCreationAttributes>, AttendanceAttributes {
  getUser: BelongsToGetAssociationMixin<UserInstance>;
}

export const AttendanceModel =
  sequelize.define<AttendanceInstance>('attendance', {
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
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    totalRegisteredTime: DataTypes.BIGINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

/**
 * Relations definition
 */

/**
 * User -> Attendance
 * one-to-many
 * One user can have multiple attendance records
 */
UserModel.hasMany(AttendanceModel);
AttendanceModel.belongsTo(UserModel);