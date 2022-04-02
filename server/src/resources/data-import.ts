import { DepartmentModel } from '../features/department/department.model';
import { UserModel, UserRoles } from '../features/user/user.model';
import * as bcrypt from 'bcrypt';
import { AttendanceModel } from '../features/attendance/attendance.model';

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
  const departments = [
    {
      name: 'Administration',
    },
    {
      name: 'Production',
    },
    {
      name: 'Operations',
    },
    {
      name: 'Finance',
    },
    {
      name: 'Marketing/Sales',
    },
  ];

  const users = [
    {
      name: 'admin',
      role: UserRoles.ADMIN,
      departmentId: 1,
    },
    {
      name: 'prod1',
      role: UserRoles.DEFAULT,
      departmentId: 2,
    },
    {
      name: 'prod2',
      role: UserRoles.DEFAULT,
      departmentId: 2,
    },
    {
      name: 'op1',
      role: UserRoles.DEFAULT,
      departmentId: 3,
    },
    {
      name: 'op2',
      role: UserRoles.DEFAULT,
      departmentId: 3,
    },
    {
      name: 'fin1',
      role: UserRoles.DEFAULT,
      departmentId: 4,
    },
    {
      name: 'mkt1',
      role: UserRoles.DEFAULT,
      departmentId: 4,
    },
  ];

  const attendances = [{
    userId: 1,
    startTime: new Date('2022-04-02 15:15:09'),
    endTime: new Date('2022-04-02 15:15:09'),
    totalRegisteredTime: 15480000
  }, {
    userId: 1,
    startTime: new Date('2022-04-02 15:15:09'),
    endTime: new Date('2022-04-02 15:15:09'),
    totalRegisteredTime: 15480000
  }, {
    userId: 2,
    startTime: new Date('2022-04-02 15:15:09'),
    endTime: new Date('2022-04-02 15:15:09'),
    totalRegisteredTime: 15480000
  }, {
    userId: 2,
    startTime: new Date('2022-04-02 15:15:09'),
    endTime: new Date('2022-04-02 15:15:09'),
    totalRegisteredTime: 15480000
  }, {
    userId: 3,
    startTime: new Date('2022-04-02 15:15:09'),
    endTime: new Date('2022-04-02 15:15:09'),
    totalRegisteredTime: 15480000
  }, {
    userId: 3,
    startTime: new Date('2022-04-02 15:15:09'),
    endTime: new Date('2022-04-02 15:15:09'),
    totalRegisteredTime: 15480000
  }, {
    userId: 3,
    startTime: new Date('2022-04-02 15:15:09'),
    endTime: new Date('2022-04-02 15:15:09'),
    totalRegisteredTime: 15480000
  }]

  for (const department of departments) {
    await DepartmentModel.create(department)
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    await UserModel.create({
      firstName: `${user.name}_first`,
      lastName: `${user.name}_last`,
      email: `${user.name}@gmail.com`,
      fingerprintId: i + 1,
      fingerprintTemplate: FINGERPRINT_TEMPLATE,
      password: bcrypt.hashSync('123', 8),
      departmentId: user.departmentId,
      PIN: '2004040240424042',
      dateOfBirth: new Date('2000-01-01 01:01:01'),
      role: user.role,
    })
  }

  for (const attendance of attendances) {
    await AttendanceModel.create(attendance);
  }
  console.log(`Successfully imported initial data`);
};
