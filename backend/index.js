import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// DB pool
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "todo_db",
});

// Create table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`);

// Get tasks for a user
app.get("/api/tasks/:username", async (req, res) => {
  const { username } = req.params;
  const result = await pool.query(
    "SELECT * FROM tasks WHERE username=$1 ORDER BY id ASC",
    [username]
  );
  res.json(result.rows);
});

// Add task for a user
app.post("/api/tasks/:username", async (req, res) => {
  const { username } = req.params;
  const { title, desc } = req.body;
  if (!title || !desc) return res.status(400).json({ error: "Missing fields" });
  const result = await pool.query(
    "INSERT INTO tasks (username, title, description) VALUES ($1, $2, $3) RETURNING *",
    [username, title, desc]
  );
  res.json(result.rows[0]);
});

// Toggle completed
app.put("/api/tasks/:username/:id", async (req, res) => {
  const { id, username } = req.params;
  const { completed } = req.body;
  const result = await pool.query(
    "UPDATE tasks SET completed=$1 WHERE id=$2 AND username=$3 RETURNING *",
    [completed, id, username]
  );
  res.json(result.rows[0]);
});

// Delete task
app.delete("/api/tasks/:username/:id", async (req, res) => {
  const { id, username } = req.params;
  await pool.query("DELETE FROM tasks WHERE id=$1 AND username=$2", [
    id,
    username,
  ]);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Backend running on ${PORT}`));
