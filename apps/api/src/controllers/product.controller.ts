import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { ProductQueryParams } from "@repo/types";

export const productController = {
  async getProducts(req: Request, res: Response) {
    try {
      const { search, minPrice, maxPrice, sortBy, page, limit } = req.query;

      const params: ProductQueryParams = {
        search: search ? String(search) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy: sortBy as ProductQueryParams["sortBy"],
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      };

      const result = await productService.getProducts(params);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id as string);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  }
};
