// import { NextApiRequest, NextApiResponse } from "next";
// import { ConnectionObject } from "../connection";
// import { createPool } from "mysql2/promise";
// import { verify } from "jsonwebtoken";
// import { userDetailsType } from "@/types/userDetails";
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const { method } = req;
//     const { token } = req.cookies;
//     if (!token) res.status(400).json("You must login to see the details")
//     else {
//         verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
//             const pool = createPool(ConnectionObject);
//             if (err) return res.status(401).json({ message: "You are not logged in" });
//             else {
//                 const { user }: { user: userDetailsType } = decoded as any;
//                 const [rows, fields] = await pool.query(`DESCRIBE ${user.tablename}`)
//                 res.status(200).json(rows);
//             }
//         })
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionObject } from "../connection";
import { createPool } from "mysql2/promise";
import { verify } from "jsonwebtoken";
import { userDetailsType } from "@/types/userDetails";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies;
  if (!token) return res.status(400).json({ message: "You must login to see the details" });

  verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
    const pool = createPool(ConnectionObject);
    if (err) return res.status(401).json({ message: "You are not logged in" });

    const { user }: { user: userDetailsType } = decoded as any;

    try {
      let query = "";

      if (user.role === "student") {
        // 👩‍🎓 Just return the table structure for students
        query = `DESCRIBE ${user.tablename}`;
      } else if (user.role === "teacher" || user.role === "admin") {
        // 👩‍🏫 Show average marks for each subject (analytics)
        query = `
          SELECT 
            subject,
            ROUND(AVG(cia1), 2) AS avg_cia1,
            ROUND(AVG(cia2), 2) AS avg_cia2,
            ROUND(AVG(final), 2) AS avg_final
          FROM ${user.tablename}
          GROUP BY subject
          ORDER BY subject;
        `;
      } else {
        return res.status(403).json({ message: "Unauthorized role" });
      }

      const [rows] = await pool.query(query);
      await pool.end();
      res.status(200).json(rows);
    } catch (error: any) {
      console.error("❌ Analytics Query Error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};
