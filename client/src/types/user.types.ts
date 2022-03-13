import { UserRoles } from './enums';

export interface UserCreationAttributes {
  id: number;
  departmentId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
  dateOfBirth: string; // ISO
  PIN: string;
}