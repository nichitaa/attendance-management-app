import { Express } from 'express';

declare global {
  export namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
