import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { LoginCredentials, SignupCredentials } from "@repo/types";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const credentials: SignupCredentials = req.body;
      
      if (!credentials.email || !credentials.password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      const response = await authService.register(credentials);
      return res.status(201).json(response);
    } catch (error: any) {
      const message = error.message || "Registration failed.";
      return res.status(error.message?.includes("already exists") ? 409 : 500).json({ message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const credentials: LoginCredentials = req.body;

      if (!credentials.email || !credentials.password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      const response = await authService.login(credentials);
      return res.status(200).json(response);
    } catch (error: any) {
      const message = error.message || "Login failed.";
      return res.status(401).json({ message });
    }
  },

  async me(req: Request, res: Response) {
    // Usually fetching current user from DB. We'll simply mirror the context back for this simple setup.
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    return res.status(200).json({ user });
  }
};
