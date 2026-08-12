import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const usersFile = path.join(dataDir, "users.json");
const useLocalJSON = process.env.USE_LOCAL_JSON === "true" || (!process.env.MONGO_URI && process.env.NODE_ENV !== "production");

const app = express();

// Middleware
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function ensureDataFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, "[]", "utf8");
  }
}

async function readUsers() {
  const source = await fs.readFile(usersFile, "utf8");
  return JSON.parse(source || "[]");
}

async function writeUsers(users) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf8");
}

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name, firstName: user.firstName, lastName: user.lastName, phone: user.phone }, process.env.JWT_SECRET || "localdevsecret", {
    expiresIn: "7d",
  });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing authorization token." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "localdevsecret");
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// Routes
if (useLocalJSON) {
  console.log("Using local JSON storage for authentication.");

  app.post("/api/auth/register", async (req, res, next) => {
    try {
      await ensureDataFile();
      const { firstName, lastName, phone, email, password } = req.body;

      if (!firstName || !lastName || !phone || !email || !password) {
        return res.status(400).json({ message: "First name, last name, phone, email, and password are required." });
      }

      const users = await readUsers();
      if (users.find((user) => user.email === email.toLowerCase())) {
        return res.status(409).json({ message: "An account with that email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        firstName,
        lastName,
        phone,
        name: `${firstName} ${lastName}`,
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await writeUsers(users);

      const token = createToken(newUser);
      return res.status(201).json({
        token,
        _id: newUser.id,
        name: newUser.name,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/login", async (req, res, next) => {
    try {
      await ensureDataFile();
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      const users = await readUsers();
      const user = users.find((userItem) => userItem.email === email.toLowerCase());

      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = createToken(user);
      return res.json({
        token,
        _id: user.id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/auth/me", authMiddleware, async (req, res, next) => {
    try {
      const users = await readUsers();
      const user = users.find((u) => u.id === req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.json({
        _id: user.id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (error) {
      next(error);
    }
  });
} else {
  app.use("/api/auth", authRoutes);
}

// Dashboard route (protected)
app.get("/api/dashboard", async (req, res) => {
  // For now, return mock data - you can make this protected later
  res.json({
    performance: "+24.8%",
    balance: "$38,620",
    openPositions: 5,
    welcome: "Welcome back to Amdako Strategies!",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    if (!useLocalJSON) {
      await connectDB();
    } else {
      console.log("Using local JSON storage for authentication in backend/server.js.");
    }

    await ensureDataFile();

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend server:", error.message);
    process.exit(1);
  }
}

startServer();