"use client";

import { useEffect, useState } from "react";
import { ProductGrid, SearchBar, Button } from "@repo/ui";
import { productClient } from "../../lib/product-client";
import { Product } from "@repo/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async (search?: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await productClient.getProducts({ search });
      setProducts(response.items);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchProducts(term);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6 sm:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              All Products
            </h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              Browse our latest arrivals and premium selections.
            </p>
          </div>
          <div className="w-full sm:w-96 flex">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search products..." 
              value={searchTerm}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <ProductGrid 
            products={products} 
            emptyStateMessage={searchTerm ? `No products found matching "${searchTerm}"` : "Our catalog is currently empty."}
          />
        )}
      </div>
    </div>
  );
}
