// import { NextApiRequest,NextApiResponse } from "next";
// import { ConnectionObject } from "../connection";
// import { createPool } from "mysql2";
// import { verify } from "jsonwebtoken";
// import { userDetailsType } from "@/types/userDetails";
// import { log } from "console";
// export default async (req:NextApiRequest,res:NextApiResponse)=>{
//  const { token } = req.cookies;
//     if (!token) res.status(400).json("You must login to see the details");
//     else {
//         verify(token!, process.env.JWT_SECRET!, async (err, decoded) => {
//             const pool = createPool(ConnectionObject);
//             if (err)
//                 return res.status(401).json({ message: "You are not logged in" });
//             else {
//                 const { user }: { user: userDetailsType } = decoded as any; 
//                 const {limit,subject}=req.query;
//                 if (user.role === "teacher" || user.role === "admin") {
//                     const q = `SELECT * FROM ${user.tablename} ORDER BY CAST(${subject} AS DECIMAL(10,2)) DESC LIMIT ${limit}`;
//                     // const avg=`SELECT AVG(CAST(${subject} AS DECIMAL(10,2))) FROM ${user.tablename} where testname="CIA-1"`;
//                     pool.query(q, (err, results) => {
//                         if (err) res.status(500).json('Internal Server Error')
//                         else{
//                             res.status(200).json(results)
//                         }
//                     }); 
//                     // res.status(200).json('Hello')
//                 } else if (user.role === "student") {
//                     const q = `SELECT * FROM ${user.tablename} where id = "${user.id}"`;
//                     log(q)
//                     res.status(200).json('Internal Error')
//                 }
//             }
//         });
//     }

// }
import { NextApiRequest, NextApiResponse } from "next";
import { createPool } from "mysql2/promise";
import { verify } from "jsonwebtoken";
import { ConnectionObject } from "../connection";
import { userDetailsType } from "@/types/userDetails";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const { user }: { user: userDetailsType } = decoded as any;
    const pool = createPool(ConnectionObject);

    try {
      // ✅ Make sure these column names match your MySQL table
      const query = `
        SELECT 
          subject, 
          AVG(CIA1) AS avg_cia1, 
          AVG(CIA2) AS avg_cia2, 
          AVG(FINAL) AS avg_final
        FROM ${user.tablename}
        GROUP BY subject;
      `;

      const [rows]: any = await pool.query(query);
      res.status(200).json(rows);
    } catch (error: any) {
      console.error("❌ Error fetching averages:", error.message);
      res.status(500).json({ message: "Error fetching averages", error: error.message });
    } finally {
      await pool.end();
    }
  });
}
