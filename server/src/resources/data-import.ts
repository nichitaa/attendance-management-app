import { DepartmentModel } from '../features/department/department.model';
import { UserModel, UserRoles } from '../features/user/user.model';
import * as bcrypt from 'bcrypt';

export const dataImport = async () => {
  // first department
  const headDepartment = await DepartmentModel.create(
    { name: 'Head-Department' },
    { raw: true }
  );

  // first admin
  const admin = await UserModel.create({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123', 8),
    departmentId: headDepartment.id,
    PIN: '123123123',
    dateOfBirth: new Date('2000-01-01 01:01:01'),
    role: UserRoles.ADMIN,
  });
  console.log(`Successfully imported initial data`);
};
