export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password?: string; // Optional because we might allow third-party auth, but generally required for email/password validation
}

export interface SignupCredentials {
  email: string;
  password?: string;
  name?: string;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
