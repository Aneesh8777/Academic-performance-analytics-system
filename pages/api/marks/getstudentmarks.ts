// import { NextApiRequest, NextApiResponse } from "next";
// import { ConnectionObject } from "../connection";
// // import { createPool } from "mysql2/promise";
// import { createPool } from "mysql2";
// import { verify } from "jsonwebtoken";
// import { userDetailsType } from "@/types/userDetails";
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const { method } = req;
//     const { token } = req.cookies;
//     if (!token) res.status(400).json("You must login to see the details");
//     else {
//         verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
//             const pool = createPool(ConnectionObject);
//             if (err)
//                 return res.status(401).json({ message: "You are not logged in" });
//             else {
//                 const { user }: { user: userDetailsType } = decoded as any;
//                 const {orderby}=req.query;
//                 if (user.role === "teacher" || user.role === "admin") {
//                     // const [rows, fields] = await pool.query(`SELECT * FROM ${user.tablename} order by testname `);
//                     // res.status(200).json(rows);
//                     const q = `SELECT * FROM ${user.tablename} order by ${orderby}`;
//                     pool.query(q, (err, results) => {
//                         if (err) {
//                             res.status(400).json(err);
//                             console.log(err);
//                         } else res.status(200).json(results);
//                     });
//                 } else if (user.role === "student") {
//                     const q = `SELECT * FROM ${user.tablename} where id = "${user.id}"`;
//                     pool.query(q, (err, results) => {
//                         if (err) res.status(400).json(err);
//                         else res.status(200).json(results);
//                     });
//                 }
//             }
//         });
//     }
// };

import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies;
  if (!token) return res.status(400).json("You must login to see the details");

  verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
    const pool = createPool(ConnectionObject);

    if (err) return res.status(401).json({ message: "You are not logged in" });

    const { user }: { user: userDetailsType } = decoded as any;
    const orderby = (req.query.orderby as string) || "id";

    // ✅ Define allowed columns (modify based on your DB schema)
    const allowedColumns = ["id", "subject", "cia1", "cia2", "final"];
    const safeOrder = allowedColumns.includes(orderby.toLowerCase()) ? orderby : "id";

    try {
      if (user.role === "teacher" || user.role === "admin") {
        // Teacher/Admin can see full marks list ordered safely
        const q = `SELECT * FROM ${user.tablename} ORDER BY ${safeOrder}`;
        pool.query(q, (err, results) => {
          if (err) {
            console.error("❌ SQL Error:", err.sqlMessage);
            return res.status(400).json({ error: err.sqlMessage });
          }
          res.status(200).json(results);
        });
      } else if (user.role === "student") {
        // Student only sees their own marks
        const q = `SELECT * FROM ${user.tablename} WHERE id = ?`;
        pool.query(q, [user.id], (err, results) => {
          if (err) {
            console.error("❌ SQL Error:", err.sqlMessage);
            return res.status(400).json({ error: err.sqlMessage });
          }
          res.status(200).json(results);
        });
      } else {
        res.status(403).json({ message: "Unauthorized role" });
      }
    } catch (error: any) {
      console.error("❌ Unexpected Error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};
