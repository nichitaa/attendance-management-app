export class SuccessResponse {
  public statusCode: number;
  public message: string;
  public data: any;

  constructor({ code = 200, message = 'Successfully completed!', data }: {
    code?: number,
    message?: string,
    data?: any
  }) {
    this.statusCode = code;
    this.message = message;
    this.data = data;
  }
}