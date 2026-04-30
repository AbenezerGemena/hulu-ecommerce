import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const userPayload = authService.verifyToken(token);
    (req as any).user = userPayload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
