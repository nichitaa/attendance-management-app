import { DepartmentModel } from '../features/department/department.model';
import { UserModel, UserRoles } from '../features/user/user.model';
import * as bcrypt from 'bcrypt';

const FINGERPRINT_TEMPLATE = `
FFFFFFFFFFFFFFFFFF0165159200FFFEFFFEFFFEFFFEF80EC00680008000800080000000000000000000000000
008000000000000000000000000000000020AB78324242982B0DEF01FFFFFFFF0200825E1F56592A3ED8D967420
1F900000000000000000000000000000000000000000000000000000000000000000000000000000000
000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000056CEF01FFFFFFFF0200820
3015E169700FFFEFFFEFFFEFF1EC006C002C0008000000000000000000000000000000000000000000000000
000FFFFFFFFFFFFFFFFFFFFFF98415E1BA41ADE49A4431E6BA481FE2E26047E60AB033E0AAD845E59B2DC5E4
5B39ADE0AB604BE09BADC5E1F3D9ABE553F04FE48C29ADE3898031F26AD843F53AF44FF71B81F9F2AF9EF0
1FFFFFFFF08008239C306376297D71C659B2C7C2E3944160000000000000000000000000000000000000000
000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000618FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
`.replace(/\n/g, '');

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
    fingerprintId: 1,
    fingerprintTemplate: FINGERPRINT_TEMPLATE,
    password: bcrypt.hashSync('123', 8),
    departmentId: headDepartment.id,
    PIN: '123123123',
    dateOfBirth: new Date('2000-01-01 01:01:01'),
    role: UserRoles.ADMIN,
  });
  console.log(`Successfully imported initial data`);
};
