export interface IAPIResponse<T> {
  isSuccess: boolean;
  error?: string;
  data?: T;
  message?: string;
}