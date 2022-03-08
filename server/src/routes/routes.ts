import { Router } from 'express';
import { DepartmentRouter } from '../features/department/department.router';
import { DepartmentController } from '../features/department/department.controller';
import { UserRouter } from '../features/user/user.router';
import { UserController } from '../features/user/user.controller';
import { AttendanceRouter } from '../features/attendance/attendance.router';
import { AttendanceController } from '../features/attendance/attendance.controller';


export interface AppRouter {
  Router: Router;
}

export const routes: AppRouter[] = [
  new DepartmentRouter(new DepartmentController()),
  new UserRouter(new UserController()),
  new AttendanceRouter(new AttendanceController()),
];
