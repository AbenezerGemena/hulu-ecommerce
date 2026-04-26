import React from "react";

export interface ProductCardProps {
  id: string | number;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  imageUrl: string;
  imageAlt?: string;
  onAddToCart?: () => void;
  currencySymbol?: string;
  badge?: string;
}

export function ProductCard({
  id,
  title,
  price,
  originalPrice,
  rating = 0,
  reviewCount = 0,
  imageUrl,
  imageAlt,
  onAddToCart,
  currencySymbol = "$",
  badge,
}: ProductCardProps) {

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      const isFilled = index < Math.floor(rating);
      const isHalf = !isFilled && index < rating;

      return (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFilled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={isFilled ? 0 : 1.5}
          className={`w-4 h-4 ${isFilled || isHalf ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
        >
          {isHalf ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0}
              fill="currentColor"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          )}
        </svg>
      );
    });
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-sm">
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        {badge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider bg-red-500 rounded-full shadow-sm">
            {badge}
          </div>
        )}
        <img
          src={imageUrl}
          alt={imageAlt || title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
          loading="lazy"
        />
        {/* Overlay Add to cart for desktop optional */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mt-2">
          <div className="flex items-center">{renderStars()}</div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({reviewCount})
          </span>
        </div>

        {/* Price and Cart Action */}
        <div className="flex items-end justify-between mt-auto pt-4">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through mb-0.5">
                {currencySymbol}
                {originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {currencySymbol}
              {price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={onAddToCart}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
