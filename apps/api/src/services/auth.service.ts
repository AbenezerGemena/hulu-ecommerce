import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, LoginCredentials, SignupCredentials, AuthResponse } from "@repo/types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_development_secret_key";
const SALT_ROUNDS = 10;

// This would typically be replaced by a proper database (e.g., Prisma + Postgres)
const DUMMY_DB: Record<string, User & { passwordHash: string }> = {};

export const authService = {
  async register(credentials: SignupCredentials): Promise<AuthResponse> {
    if (DUMMY_DB[credentials.email]) {
      throw new Error("User already exists with this email.");
    }

    const passwordHash = await bcrypt.hash(credentials.password || "", SALT_ROUNDS);
    
    const id = Date.now().toString();
    const newUser = {
      id,
      email: credentials.email,
      name: credentials.name,
      passwordHash,
      createdAt: new Date(),
    };

    DUMMY_DB[credentials.email] = newUser;

    const userToReturn: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    };

    const token = jwt.sign({ userId: id, email: credentials.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return { token, user: userToReturn };
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = DUMMY_DB[credentials.email];
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(credentials.password || "", user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    const userToReturn: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return { token, user: userToReturn };
  },
  
  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      throw new Error("Invalid token.");
    }
  }
};
