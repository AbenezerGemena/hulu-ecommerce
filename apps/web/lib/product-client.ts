import { PaginatedProducts, Product, ProductQueryParams } from "@repo/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const productClient = {
  async getProducts(params?: ProductQueryParams): Promise<PaginatedProducts> {
    const url = new URL(`${API_BASE_URL}/products`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 } // Example ISR implementation
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  },

  async getProductById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }

    return res.json();
  }
};
