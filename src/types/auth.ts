export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  data: null;
}

export interface ApiValidationError extends ApiError {
  errors: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError | ApiValidationError;

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
