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

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageAlt?: string;
  badge?: string;
  createdAt: string | Date;
}

export interface ProductQueryParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price_asc" | "price_desc" | "rating_desc" | "newest";
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

