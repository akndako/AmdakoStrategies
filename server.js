import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./backend/config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const usersFile = path.join(dataDir, "users.json");
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const useLocalJSON = process.env.USE_LOCAL_JSON === "true" || (!process.env.MONGO_URI && NODE_ENV !== "production");

if (!JWT_SECRET && NODE_ENV === "production") {
  console.error("FATAL: JWT_SECRET is not set in environment variables");
  process.exit(1);
}

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

// CORS configuration
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Start server
async function startServer() {
  try {
    if (!useLocalJSON) {
      await connectDB();
    } else {
      console.log("Using local JSON storage for authentication.");
    }

    await ensureDataFile();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

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
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
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
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

// Validation middleware
const validateRegister = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

const validateLogin = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  const status = err.status || 500;
  const message = NODE_ENV === "production" ? "Internal server error" : err.message;
  
  res.status(status).json({
    message,
    ...(NODE_ENV !== "production" && { stack: err.stack }),
  });
};

app.post(
  "/api/register",
  validateRegister,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      await ensureDataFile();
      const { name, email, password } = req.body;

      const users = await readUsers();
      if (users.find((user) => user.email === email)) {
        return res.status(409).json({ message: "An account with that email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        name,
        email,
        passwordHash: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      await writeUsers(users);

      const token = createToken(newUser);
      return res.status(201).json({
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/login",
  validateLogin,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      await ensureDataFile();
      const { email, password } = req.body;

      const users = await readUsers();
      const user = users.find((userItem) => userItem.email === email);

      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = createToken(user);
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get("/api/dashboard", authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;
    return res.json({
      performance: "+24.8%",
      balance: "$38,620",
      openPositions: 5,
      welcome: `Welcome back, ${user.name}!`,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/profile", authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware (must be last)
app.use(errorHandler);
