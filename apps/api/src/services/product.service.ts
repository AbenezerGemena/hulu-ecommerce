import { Product, ProductQueryParams, PaginatedProducts } from "@repo/types";

// Mock Data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Premium Wireless Headphones",
    description: "High-fidelity audio with active noise cancellation and 30-hour battery life.",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 1245,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Sale",
    createdAt: new Date("2023-01-15").toISOString()
  },
  {
    id: "p2",
    title: "Minimalist Mechanical Keyboard",
    description: "Tactile switches, hot-swappable PCB, and double-shot PBT keycaps.",
    price: 149.50,
    rating: 4.6,
    reviewCount: 856,
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date("2023-03-22").toISOString()
  },
  {
    id: "p3",
    title: "Ergonomic Office Chair",
    description: "Adjustable lumbar support, breathable mesh, and 4D armrests for maximum comfort.",
    price: 499.00,
    originalPrice: 599.00,
    rating: 4.9,
    reviewCount: 342,
    imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    createdAt: new Date("2022-11-10").toISOString()
  },
  {
    id: "p4",
    title: "4K Ultrawide Monitor",
    description: "34-inch curved display with 144Hz refresh rate and 1ms response time.",
    price: 799.99,
    rating: 4.7,
    reviewCount: 2018,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date("2023-05-05").toISOString()
  },
  {
    id: "p5",
    title: "Smart Coffee Maker",
    description: "App-controlled brewing with programmable schedules and built-in grinder.",
    price: 249.00,
    rating: 4.3,
    reviewCount: 651,
    imageUrl: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date("2023-04-12").toISOString()
  },
  {
    id: "p6",
    title: "Eco-Friendly Water Bottle",
    description: "Vacuum insulated stainless steel, keeps drinks cold for 24 hours.",
    price: 35.00,
    rating: 4.5,
    reviewCount: 4230,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    createdAt: new Date("2023-02-18").toISOString()
  }
];

export const productService = {
  async getProducts(params: ProductQueryParams): Promise<PaginatedProducts> {
    const { 
      search, 
      minPrice, 
      maxPrice, 
      sortBy = "newest", 
      page = 1, 
      limit = 10 
    } = params;

    let filtered = [...MOCK_PRODUCTS];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Price filters
    if (minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= maxPrice);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating_desc":
          return b.rating - a.rating;
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    // Pagination
    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filtered.slice(startIndex, endIndex);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      items: paginatedItems,
      total,
      page,
      limit
    };
  },

  async getProductById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 150));
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return product || null;
  }
};
