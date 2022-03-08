import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../sqlz';


interface DepartmentAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}

export interface DepartmentInstance extends Model<DepartmentAttributes, DepartmentCreationAttributes>, DepartmentAttributes {
}

export const DepartmentModel =
  sequelize.define<DepartmentInstance>('department', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });



