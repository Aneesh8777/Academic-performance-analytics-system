import { NextApiRequest, NextApiResponse } from "next";
import { createPool } from "mysql2/promise";
import bcrypt from "bcrypt";
import { ConnectionObject } from "../connection";

const pool = createPool(ConnectionObject);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ✅ Ensure main table exists (auto-create if deleted)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Userdetails (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        role VARCHAR(50),
        tablename VARCHAR(100)
      );
    `);

    // ✅ Check if email already exists
    const [existing]: any = await pool.query(
      "SELECT * FROM Userdetails WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create a personal marks table name
    const tablename = `marks_${username.toLowerCase().replace(/\s+/g, "_")}`;

    // ✅ Insert user into Userdetails
    await pool.query(
      "INSERT INTO Userdetails (username, email, password, role, tablename) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, role || "student", tablename]
    );

    // ✅ Auto-create marks table for that user
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tablename} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        subject VARCHAR(100),
        CIA1 DECIMAL(5,2),
        CIA2 DECIMAL(5,2),
        FINAL DECIMAL(5,2)
      );
    `);

    // ✅ Optional — insert some dummy subjects for dashboard testing
    await pool.query(`
      INSERT INTO ${tablename} (subject, CIA1, CIA2, FINAL)
      VALUES 
        ('Machine Learning', 85, 87, 90),
        ('Data Structures', 78, 82, 88),
        ('AI Fundamentals', 80, 83, 85);
    `);

    return res.status(201).json({
      message: "User registered successfully",
      table: tablename,
    });

  } catch (err: any) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
