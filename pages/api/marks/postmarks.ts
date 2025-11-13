// import { NextApiRequest, NextApiResponse } from "next";
// import { ConnectionObject } from "../connection";
// // import { createPool } from "mysql2/promise";
// import { createPool } from "mysql2";
// import { verify } from "jsonwebtoken";
// import { userDetailsType } from "@/types/userDetails";
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const { method } = req;
//     const { token } = req.cookies;

//     if (method === "POST") {
//         if (!token) res.status(400).json("You must login to see the details");
//         else {
//             verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
//                 const pool = createPool(ConnectionObject);
//                 if (err)
//                     return res.status(401).json({ message: "You are not logged in" });
//                 else {
//                     const { user }: { user: userDetailsType } = decoded as any;
//                     if (user.role === "teacher" || user.role === "admin") {
//                         const body = req.body;
//                         let marks: Array<string> = [];
//                         Object.keys(body).forEach((key) => {
//                             marks.push(`"${body[key]}"`);
//                         });
//                         const qm = marks.toString();
//                         const q = `INSERT INTO ${user.tablename} VALUES(${qm})`;
//                         const response = pool.query(q, (err, results) => {
//                             if (err) res.status(400).json(err);
//                             else res.status(201).json("Marks Inserted Successfully");
//                         });
//                     } else if (user.role === "student") {
//                         const q = `SELECT * FROM ${user.tablename} where ${user.tablename}.id = "${user.id}" order by testname`;
//                         const da = pool.query(q, (err, results) => {
//                             if (err) res.status(400).json(err);
//                             else res.status(200).json(results);
//                         });
//                     }
//                 }
//             });
//         }
//     }
// };

import { NextApiRequest, NextApiResponse } from "next";
import { createPool } from "mysql2/promise";
import { verify } from "jsonwebtoken";
import { ConnectionObject } from "../connection";
import { userDetailsType } from "@/types/userDetails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const { user }: { user: userDetailsType } = decoded as any;
    const pool = createPool(ConnectionObject);

    try {
      const { subject, CIA1, CIA2, FINAL } = req.body;

      if (!subject || !CIA1 || !CIA2 || !FINAL) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // ✅ Include column names explicitly to avoid mismatch
      const query = `
        INSERT INTO ${user.tablename} (subject, CIA1, CIA2, FINAL)
        VALUES (?, ?, ?, ?)
      `;

      await pool.query(query, [subject, CIA1, CIA2, FINAL]);
      res.status(200).json({ message: "Marks added successfully" });
    } catch (error: any) {
      console.error("❌ Error inserting marks:", error.message);
      res.status(500).json({ message: "Error inserting marks", error: error.message });
    } finally {
      await pool.end();
    }
  });
}
