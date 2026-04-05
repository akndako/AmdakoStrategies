import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const usersFile = path.join(dataDir, "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "amdako-demo-secret";
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

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

app.post("/api/register", async (req, res) => {
  await ensureDataFile();
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const users = await readUsers();
  const normalizedEmail = email.toLowerCase();
  if (users.find((user) => user.email === normalizedEmail)) {
    return res.status(409).json({ message: "An account with that email already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    name,
    email: normalizedEmail,
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
});

app.post("/api/login", async (req, res) => {
  await ensureDataFile();
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const users = await readUsers();
  const normalizedEmail = email.toLowerCase();
  const user = users.find((userItem) => userItem.email === normalizedEmail);

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
});

app.get("/api/dashboard", authMiddleware, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  return res.json({
    performance: "+24.8%",
    balance: "$38,620",
    openPositions: 5,
    welcome: `Welcome back, ${user.name}!`,
  });
});

app.get("/api/profile", authMiddleware, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  return res.json({ user });
});

app.listen(PORT, async () => {
  await ensureDataFile();
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
