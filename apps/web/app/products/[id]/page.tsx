"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productClient } from "../../../lib/product-client";
import { Product } from "@repo/types";
import { Button } from "@repo/ui";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const id = params?.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await productClient.getProductById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center dark:bg-gray-950">
        <svg
          className="animate-spin h-12 w-12 text-blue-600"
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
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 dark:bg-gray-950">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-6 rounded-2xl max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Oops!</h2>
          <p>{error || "Product not found."}</p>
          <Button onClick={() => router.push("/products")} className="mt-6" variant="outline">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <button 
          onClick={() => router.back()} 
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center transition-colors focus:outline-none"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-auto w-full bg-gray-100 dark:bg-gray-800">
            {product.badge && (
              <div className="absolute top-6 left-6 z-10 px-4 py-1.5 text-sm font-bold text-white uppercase tracking-wider bg-red-500 rounded-full shadow-sm">
                {product.badge}
              </div>
            )}
            <img
              src={product.imageUrl}
              alt={product.imageAlt || product.title}
              className="w-full h-full object-cover object-center absolute inset-0"
            />
          </div>

          {/* Checkout Details Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {product.title}
            </h1>
            
            <div className="mt-4 flex items-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-4 text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {product.rating} ({product.reviewCount} reviews)
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Description</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto text-lg py-3 px-8" onClick={() => alert("Added to cart!")}>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto text-lg py-3 px-8">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
