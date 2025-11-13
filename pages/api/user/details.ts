// import { NextApiRequest, NextApiResponse } from "next";
// import { verify } from "jsonwebtoken";
// import { userDetailsType } from "@/types/userDetails";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const { method } = req;
//     const { token } = req.cookies;
//     verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
//         if (err) return res.status(401).json({ message: "You are not logged in" });
//         const { user }: { user: userDetailsType } = decoded as any;
//         res.status(200).json(user)
//     })
// }

// pages/api/user/details.ts
import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import mysql from "mysql2/promise";

type ApiResponse = { ok: boolean; message?: string; loggedUser?: any; students?: any[] };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  try {
    // 1) Read token from cookie OR Authorization header (helps debugging)
    const cookieToken = (req.cookies && (req.cookies.token || req.cookies.Token)) || null;
    const header = req.headers.authorization || req.headers.Authorization || "";
    const headerToken = header.startsWith("Bearer ") ? header.slice(7) : header || null;
    const token = cookieToken || headerToken;

    console.log("DEBUG /api/user/details - cookieToken:", !!cookieToken, "headerToken:", !!headerToken);

    if (!token) {
      return res.status(401).json({ ok: false, message: "No token provided (send cookie 'token' or Authorization header)" });
    }

    // 2) Verify JWT
    let decoded: any;
    try {
      decoded = verify(token, process.env.JWT_SECRET || "devsecret");
    } catch (err: any) {
      console.error("DEBUG JWT verify error:", err.message || err);
      return res.status(401).json({ ok: false, message: "Invalid token" });
    }

    // decoded might contain user information depending on how token was created
    const loggedUser = decoded?.user || decoded?.payload || decoded || null;
    console.log("DEBUG decoded user:", loggedUser ? (loggedUser.email || loggedUser.name || loggedUser.id) : "no user in token");

    // 3) Connect to MySQL (use env vars)
    const DB_HOST = process.env.DB_HOST || "localhost";
    const DB_USER = process.env.DB_USER || "root";
    const DB_PASS = process.env.DB_PASS || "";
    const DB_NAME = process.env.DB_NAME || "student_tracker";

    console.log("DEBUG DB connect to:", DB_HOST, DB_USER, DB_NAME);

    const conn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
    });

    // 4) Query students table — adjust table/column names if your schema differs
    const [rows] = await conn.execute("SELECT id, username, email, rollno, class, department FROM students LIMIT 100");
    await conn.end();

    console.log("DEBUG students count:", Array.isArray(rows) ? rows.length : "not array");

    return res.status(200).json({ ok: true, loggedUser, students: Array.isArray(rows) ? rows : [] });
  } catch (error: any) {
    console.error("ERROR /api/user/details:", error);
    return res.status(500).json({ ok: false, message: "Server error. Check server console." });
  }
}
